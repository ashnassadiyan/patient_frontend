import { Box } from "@mui/material";
import React from "react";
import "./homepagewaves.css";

const HomepageWaves = () => {
  return (
    <Box sx={{ display: { md: "flex", sm: "none", xs: "none" } }}>
      <div class="waveWrapper waveAnimation">
        <div class="waveWrapperInner bgTop">
          <div
            class="wave waveTop"
            style={{
              backgroundImage:
                "url('http://front-end-noobs.com/jecko/img/wave-top.png')",
            }}
          ></div>
        </div>
        <div class="waveWrapperInner bgMiddle">
          <div
            class="wave waveMiddle"
            style={{
              backgroundImage:
                "url('http://front-end-noobs.com/jecko/img/wave-mid.png')",
            }}
          ></div>
        </div>
        <div class="waveWrapperInner bgBottom">
          <div
            class="wave waveBottom"
            style={{
              backgroundImage:
                "url('http://front-end-noobs.com/jecko/img/wave-bot.png')",
            }}
          ></div>
        </div>
      </div>
    </Box>
  );
};

export default HomepageWaves;
