import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Typography, Box, Button, Grid } from "@mui/material";
import { Fragment, memo } from "react";
import { useIntl } from "react-intl";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import veganHeroImage from "@assets/vegan-hero.png"; // Ensure this image exists or replace with a valid path

export const HomePage = memo(() => {
  const { formatMessage } = useIntl();

  return (
    <Fragment>
      <Seo title="Vegan Recipes | Home" />
      <WebsiteLayout>
        <Box
          sx={{
            backgroundImage: `url(${veganHeroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
          }}
        >
          <Box>
            <Typography variant="h2" fontWeight="bold">
              Welcome to Vegan Delights
            </Typography>
            <Typography variant="h5" mt={2}>
              Discover delicious and healthy vegan recipes for every occasion.
            </Typography>
            <Button
              variant="contained"
              color="success"
              size="large"
              sx={{ mt: 4 }}
            >
              Explore Recipes
            </Button>
          </Box>
        </Box>

        <Box sx={{ p: 4 }}>
          <Typography variant="h4" textAlign="center" mb={4}>
            Why Choose Vegan?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <ContentCard title="Health Benefits">
                <Typography>
                  A vegan diet is rich in nutrients and can improve your overall
                  health.
                </Typography>
              </ContentCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <ContentCard title="Eco-Friendly">
                <Typography>
                  Reduce your carbon footprint and help the planet by going vegan.
                </Typography>
              </ContentCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <ContentCard title="Animal Welfare">
                <Typography>
                  Support ethical treatment of animals by choosing plant-based
                  meals.
                </Typography>
              </ContentCard>
            </Grid>
          </Grid>
        </Box>
      </WebsiteLayout>
    </Fragment>
  );
});
