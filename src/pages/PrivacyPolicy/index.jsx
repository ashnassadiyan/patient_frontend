import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div>
      <Container sx={{ padding: "20px" }}>
        <Card variant="outlined">
          <CardHeader
            title={"Privacy Policy"}
            sx={{ color: "gray", fontWeight: 600 }}
          />

          <CardContent>
            <Stack sx={{ height: "100%", alignItems: "center", gap: "20px" }}>
              <Grid container>
                <Grid item md={6}>
                  <Stack
                    sx={{
                      height: "100%",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                      display: { md: "flex", sm: "none", xs: "none" },
                    }}
                  >
                    <img
                      src={"/images/privacypolicy.png"}
                      style={{ height: "400px", width: "400px" }}
                    />
                    <img
                      src={"/images/privacypolicy1.png"}
                      style={{ height: "400px", width: "400px" }}
                    />
                    <img
                      src={"/images/privacyprivacy2.png"}
                      style={{ height: "400px", width: "400px" }}
                    />
                  </Stack>
                </Grid>
                <Grid item md={6}>
                  <Stack sx={{ gap: "20px" }}>
                    <Stack sx={{ gap: "10px" }}>
                      <Divider>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            fontWeight: 600,
                            color: "gray",
                          }}
                        >
                          Introduction
                        </Typography>
                      </Divider>
                      <Typography sx={{ textAlign: "left", fontSize: "15px" }}>
                        When you use VoiceVita to feel better, you share certain
                        information with us – sensitive information. We know
                        this is no light matter and take great care to ensure
                        that information shared with us is kept safe and
                        confidential.
                      </Typography>
                      <Typography sx={{ textAlign: "left", fontSize: "15px" }}>
                        This privacy policy has been designed to help you
                        understand the data we collect, how we use this data,
                        the reasons for doing so, and your rights as a user of
                        VoiceVita.
                      </Typography>
                    </Stack>

                    <Stack sx={{ gap: "15px" }}>
                      <Divider>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            fontWeight: 600,
                            color: "gray",
                          }}
                        >
                          Data we collect
                        </Typography>
                      </Divider>
                      <Stack sx={{ gap: "10px" }}>
                        <Typography
                          sx={{
                            textAlign: "left",
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "gray",
                          }}
                        >
                          Personal information
                        </Typography>

                        <Typography
                          sx={{ textAlign: "left", fontSize: "15px" }}
                        >
                          When you use VoiceVita to feel better, you share
                          certain information with us – sensitive information.
                          We know this is no light matter and take great care to
                          ensure that information shared with us is kept safe
                          and confidential.
                        </Typography>
                      </Stack>
                      <Stack sx={{ gap: "10px" }}>
                        <Typography
                          sx={{
                            textAlign: "left",
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "gray",
                          }}
                        >
                          Health information
                        </Typography>

                        <Typography
                          sx={{ textAlign: "left", fontSize: "15px" }}
                        >
                          To help us diagnose your possible illness, you will
                          provide us with information such as age, gender, and
                          symptoms.
                        </Typography>
                      </Stack>
                      <Stack sx={{ gap: "10px" }}>
                        <Typography
                          sx={{
                            textAlign: "left",
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "gray",
                          }}
                        >
                          Audio recordings
                        </Typography>

                        <Typography
                          sx={{ textAlign: "left", fontSize: "15px" }}
                        >
                          You will provide us your symptoms in the form of an
                          audio recording using our recording feature. These
                          recordings will be stored within our System.
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack sx={{ gap: "10px" }}>
                      <Divider>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            fontWeight: 600,
                            color: "gray",
                          }}
                        >
                          How we use your data
                        </Typography>
                      </Divider>
                      <Typography sx={{ textAlign: "left", fontSize: "15px" }}>
                        When we collect your data, we aim to provide you the
                        best Service through our System. The data we collect
                        helps us to provide effective and easy-to-understand
                        diagnostic reports and recommend the most suitable type
                        of health specialist to visit. Your data helps us to
                        continuously improve the Service our System provides.
                      </Typography>
                      <Typography sx={{ textAlign: "left", fontSize: "15px" }}>
                        Our channelling feature is meant to offer a smooth
                        experience and prompt you to take action about your
                        health. The data we collect will help us to offer this
                        experience and further improve these services, by
                        improving efficiency as well as providing newer
                        features.
                      </Typography>

                      <Typography sx={{ textAlign: "left", fontSize: "15px" }}>
                        We also use your data to comply with legal obligations
                        and to protect our legal rights. Further, we review this
                        Policy document to ensure that we are adhering to it in
                        terms of the way we process your information.
                      </Typography>
                    </Stack>

                    <Stack sx={{ gap: "10px" }}>
                      <Divider>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            fontWeight: 600,
                            color: "gray",
                          }}
                        >
                          Sharing your information
                        </Typography>
                      </Divider>
                      <Typography sx={{ textAlign: "left", fontSize: "15px" }}>
                        While we do not sell or rent your personal data, we may
                        share your data with legal authorities in the event that
                        such action is warranted to protect our legal rights or
                        if required by law.
                      </Typography>
                    </Stack>

                    <Stack sx={{ gap: "10px" }}>
                      <Divider>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            fontWeight: 600,
                            color: "gray",
                          }}
                        >
                          Data Security
                        </Typography>
                      </Divider>
                      <Typography sx={{ textAlign: "left", fontSize: "15px" }}>
                        We implement security safeguards to protect your data
                        from unauthorized access, digital theft, data breaches,
                        alteration or destruction. While we strive to protect
                        your data by implementing effective safety and security
                        measures, we cannot guarantee absolute security as no
                        online service is secure.
                      </Typography>
                    </Stack>

                    <Stack sx={{ gap: "5px" }}>
                      <Divider>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            fontWeight: 600,
                            color: "gray",
                          }}
                        >
                          Your Rights as a User
                        </Typography>
                      </Divider>
                      <Typography sx={{ textAlign: "left", fontSize: "15px" }}>
                        It is important that you are aware of your rights as a
                        User of our System. You can:
                      </Typography>
                      <ul>
                        <li>
                          <Typography
                            sx={{ textAlign: "left", fontSize: "14px" }}
                          >
                            Access your personal information
                          </Typography>
                        </li>
                        <li>
                          <Typography
                            sx={{ textAlign: "left", fontSize: "14px" }}
                          >
                            Request for the amendment or deletion of your data
                          </Typography>
                        </li>
                        <li>
                          <Typography
                            sx={{ textAlign: "left", fontSize: "14px" }}
                          >
                            {" "}
                            Object or restrict processing of your information
                          </Typography>
                        </li>
                        <li>
                          <Typography
                            sx={{ textAlign: "left", fontSize: "14px" }}
                          >
                            Withdraw consent any time
                          </Typography>
                        </li>
                      </ul>
                    </Stack>

                    <Stack sx={{ gap: "10px" }}>
                      <Divider>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            fontWeight: 600,
                            color: "gray",
                          }}
                        >
                          Changes to this Privacy Policy
                        </Typography>
                      </Divider>
                      <Typography sx={{ textAlign: "left", fontSize: "15px" }}>
                        To provide you an effective and responsible Service, we
                        may make revisions to this Privacy Policy. Rest assured,
                        we will notify you when we do so, by posting these
                        updates on this Privacy Policy page, and add the date
                        the policy was updated in the “Last Updated” section.
                      </Typography>
                    </Stack>

                    <Stack sx={{ gap: "10px" }}>
                      <Divider>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            fontWeight: 600,
                            color: "gray",
                          }}
                        >
                          Need help? Contact us
                        </Typography>
                      </Divider>
                      <Typography sx={{ textAlign: "left", fontSize: "15px" }}>
                        If anything in this Policy is unclear to you, we want
                        you to know we are there to help. Simply contact us at
                        VoiceVita admin@researchsolution.com
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
