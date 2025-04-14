﻿using System.Net;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using RecipePlatform.Core.Errors;
using RecipePlatform.Core.Responses;
using RecipePlatform.Infrastructure.Configurations;
using RecipePlatform.Infrastructure.Services.Interfaces;

namespace RecipePlatform.Infrastructure.Services.Implementations;

/// <summary>
/// Inject the required service configuration from the application.json or environment variables.
/// </summary>
public class MailService(IOptions<MailConfiguration> mailConfiguration) : IMailService
{
    private readonly MailConfiguration _mailConfiguration = mailConfiguration.Value;


    public async Task<ServiceResponse> SendMail(string recipientEmail, string subject, string body, bool isHtmlBody = false, 
        string? senderTitle = null, CancellationToken cancellationToken = default)
    {
        if (!_mailConfiguration.MailEnable) // If you need only to test and not send emails you can set this variable to false, otherwise it will try to send the emails.
        {
            return ServiceResponse.ForSuccess();
        }

        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(senderTitle ?? _mailConfiguration.MailAddress, _mailConfiguration.MailAddress)); // Set the sender alias and sender's real address.
        message.To.Add(new MailboxAddress(recipientEmail, recipientEmail)); // Add the recipient mail address.
        message.Subject = subject; // Set the subject.
        message.Body = new TextPart(isHtmlBody ? "html" : "plain") { Text = body };  // Set the MIME type and email body.

        try
        {
            using var client = new SmtpClient(); // Create the SMTP client. Note that this object is disposable and as such need to use the keyword "using" to properly dispose the object after leaving the scope.
            await client.ConnectAsync(_mailConfiguration.MailHost, _mailConfiguration.MailPort, SecureSocketOptions.Auto, cancellationToken); // Connect to the mail host.
            client.AuthenticationMechanisms.Remove("XOAUTH2"); // Just to avoid issues with some clients this header is removed from the authentication request.
            await client.AuthenticateAsync(_mailConfiguration.MailUser, _mailConfiguration.MailPassword, cancellationToken); // Set the user and password for the email account.
            await client.SendAsync(message, cancellationToken); // Send the message.
            await client.DisconnectAsync(true, cancellationToken); // Disconnect the client from the host to save resources.
        }
        catch
        {
            return ServiceResponse.FromError(new(HttpStatusCode.ServiceUnavailable, "Mail couldn't be send!", ErrorCodes.MailSendFailed));
        }

        return ServiceResponse.ForSuccess();
    }
}
