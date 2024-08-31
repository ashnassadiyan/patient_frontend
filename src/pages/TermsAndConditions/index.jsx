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
            title={"Terms of Use"}
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
                      src={"/images/terms3.png"}
                      style={{ height: "400px", width: "400px" }}
                    />
                    <img
                      src={"/images/terms1.png"}
                      style={{ height: "400px", width: "400px" }}
                    />
                    <img
                      src={"/images/terms2.png"}
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
                        Reading lengthy content is tough – we know. However, it
                        is important that you read and understand Terms of Use
                        so you know what to expect from VoiceVita and what
                        VoiceVita expects from you.
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
                          Use of the Service
                        </Typography>
                      </Divider>

                      <ul>
                        <li>
                          <Stack direction={"row"} sx={{ gap: "10px" }}>
                            <Typography
                              sx={{ textAlign: "left", fontSize: "14px" }}
                            >
                              Eligibility –
                            </Typography>
                            <Typography
                              sx={{ textAlign: "left", fontSize: "14px" }}
                            >
                              You must be at least 18 years old to use our
                              System.
                            </Typography>
                          </Stack>
                        </li>
                        <li>
                          <Stack direction={"row"} sx={{ gap: "10px" }}>
                            <Typography
                              sx={{ textAlign: "left", fontSize: "14px" }}
                            >
                              Personal use –
                            </Typography>
                            <Typography
                              sx={{ textAlign: "left", fontSize: "14px" }}
                            >
                              You are allowed to use this System <b>only</b> for
                              personal purposes. You are not allowed to use this
                              Service for commercial purposes.
                            </Typography>
                          </Stack>
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

                    <Stack sx={{ gap: "15px" }}>
                      <Divider>
                        <Typography
                          sx={{
                            fontSize: "20px",
                            fontWeight: 600,
                            color: "gray",
                          }}
                        >
                          Health Information Disclaimer
                        </Typography>
                      </Divider>
                      <Stack sx={{ gap: "10px" }}>
                        <Typography
                          sx={{ textAlign: "left", fontSize: "15px" }}
                        >
                          VoiceVita provides you the opportunity to
                          self-diagnose your illness and receive recommendations
                          on the most suitable type of specialist to visit.
                          However, our Service is <b>NOT</b> meant to be a
                          substitute for a medical professional. This is why we
                          prompt you to take ownership and make responsible
                          decisions by prompting you to schedule an appointment
                          with the suitable specialist using our channelling
                          services.
                        </Typography>
                        <Typography
                          sx={{ textAlign: "left", fontSize: "15px" }}
                        >
                          The diagnostic reports generated by the System are{" "}
                          <b>solely</b> for informational purposes and are based
                          on the information you provide in your recording.
                          While we do strive to improve accuracy, we do not
                          guarantee accuracy of diagnoses and recommendations.
                        </Typography>
                        <Typography
                          sx={{ textAlign: "left", fontSize: "15px" }}
                        >
                          Our System is there to support you. It can{" "}
                          <b>NEVER</b> {""}
                          replace a doctor and its <b>ACCURACY</b> cannot be
                          fully guaranteed.
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
                          Intellectual Property
                        </Typography>
                      </Divider>
                      <Typography sx={{ textAlign: "left", fontSize: "15px" }}>
                        All content and materials on the System, including
                        logos, brand names, images, and software are the
                        intellectual property of VoiceVita and are protected by
                        copyright. You may not copy, modify, distribute, sell or
                        lease any part of the software of our System or our
                        Services.
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
                          Limitation of Liability
                        </Typography>
                      </Divider>
                      <Typography sx={{ textAlign: "left", fontSize: "15px" }}>
                        To the fullest degree as permitted by law, VoiceVita
                        shall not be liable for any damages that are direct,
                        indirect, incidental, special or consequential arising
                        out of or from the use of our System.
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
                          Indemnification
                        </Typography>
                      </Divider>
                      <Typography sx={{ textAlign: "left", fontSize: "15px" }}>
                        You consent to indemnify and hold harmless VoiceVita
                        from any claims, damages, losses, liabilities or
                        expenses arising out of your use of the System or in the
                        event you violate any Terms of Service from use of the
                        System.
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
                          Governing Law
                        </Typography>
                      </Divider>
                      <Typography sx={{ textAlign: "left", fontSize: "15px" }}>
                        Sri Lankan law shall govern these Terms, regardless of
                        conflict of law principles.
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
                          Changes to these Terms
                        </Typography>
                      </Divider>
                      <Typography sx={{ textAlign: "left", fontSize: "15px" }}>
                        To provide you an effective and responsible Service, we
                        may make revisions to this Terms of Service. Rest
                        assured, we will notify you when we do so, by posting
                        these updates on this Terms of Service page, and add the
                        date the Terms of Service was updated in the “Last
                        Updated” section.
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
                        {" "}
                        If anything in the Terms of Service is unclear to you,
                        we want you to know we are there to help. Simply contact
                        us at VoiceVita admin@researchsolution.com
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
