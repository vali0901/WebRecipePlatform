import React, { useState } from "react";
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent, CircularProgress, Card, CardContent, Typography, Box } from "@mui/material";
import { useIntl } from "react-intl";
import { useAddUser } from "@infrastructure/apis/api-management";
import { UserRoleEnum } from "@infrastructure/apis/client";

const defaultForm = { name: '', email: '', password: '', role: UserRoleEnum.Client };

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  role: UserRoleEnum;
};

const RegisterPage: React.FC = () => {
  const { formatMessage } = useIntl();
  const [form, setForm] = useState<RegisterForm>(defaultForm);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const addUser = useAddUser();

  const validate = () => {
    const newErrors: { [k: string]: string } = {};
    if (!form.name.trim()) newErrors.name = formatMessage({ id: "register.error.name", defaultMessage: "Name is required" });
    if (!form.email.trim()) newErrors.email = formatMessage({ id: "register.error.email", defaultMessage: "Email is required" });
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = formatMessage({ id: "register.error.emailFormat", defaultMessage: "Invalid email format" });
    if (!form.password) newErrors.password = formatMessage({ id: "register.error.password", defaultMessage: "Password is required" });
    else if (form.password.length < 6) newErrors.password = formatMessage({ id: "register.error.passwordLength", defaultMessage: "Password must be at least 6 characters" });
    return newErrors;
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(errs => {
      const newErrs = { ...errs };
      delete newErrs[name];
      return newErrs;
    });
  };
  const handleRoleChange = (e: SelectChangeEvent<UserRoleEnum>) => {
    setForm(f => ({ ...f, role: e.target.value as UserRoleEnum }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;
    await addUser.mutateAsync(form);
    setSuccess(true);
    setForm(defaultForm);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>{formatMessage({ id: "register.title", defaultMessage: "Register" })}</Typography>
          <form onSubmit={handleSubmit} noValidate>
            <TextField label={formatMessage({ id: "globals.name", defaultMessage: "Name" })} name="name" value={form.name} onChange={handleFormChange} fullWidth margin="normal" required error={!!errors.name} helperText={errors.name} autoComplete="name" />
            <TextField label={formatMessage({ id: "globals.email", defaultMessage: "Email" })} name="email" value={form.email} onChange={handleFormChange} fullWidth margin="normal" required type="email" error={!!errors.email} helperText={errors.email} autoComplete="email" />
            <TextField label={formatMessage({ id: "globals.password", defaultMessage: "Password" })} name="password" value={form.password} onChange={handleFormChange} fullWidth margin="normal" required type="password" error={!!errors.password} helperText={errors.password} autoComplete="new-password" />
            <FormControl fullWidth margin="normal">
              <InputLabel>{formatMessage({ id: "globals.role", defaultMessage: "Role" })}</InputLabel>
              <Select name="role" value={form.role} onChange={handleRoleChange} label={formatMessage({ id: "globals.role", defaultMessage: "Role" })}>
                <MenuItem value={UserRoleEnum.Client}>{formatMessage({ id: "roles.client", defaultMessage: "Client" })}</MenuItem>
                <MenuItem value={UserRoleEnum.Personnel}>{formatMessage({ id: "roles.personnel", defaultMessage: "Personnel" })}</MenuItem>
              </Select>
            </FormControl>
            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth size="large" disabled={addUser.status === 'pending'} startIcon={addUser.status === 'pending' ? <CircularProgress size={20} /> : null}>
                {formatMessage({ id: "register.submit", defaultMessage: "Register" })}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
      <Dialog open={success} onClose={() => setSuccess(false)}>
        <DialogTitle>{formatMessage({ id: "register.successTitle", defaultMessage: "Registration Successful" })}</DialogTitle>
        <DialogContent>
          <Typography>{formatMessage({ id: "register.successMessage", defaultMessage: "You can now log in with your new account." })}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccess(false)}>{formatMessage({ id: "globals.ok", defaultMessage: "OK" })}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RegisterPage;
