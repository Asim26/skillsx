import React from 'react';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

function Footer() {
    return (
        <div>
             <Box mt={5}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  {"Copyright © "}
                  <Link color="inherit" href="#">
                    SkillsX
                  </Link>{" "}
                  {new Date().getFullYear()}
                  {"."}
                </Typography>
              </Box>
        </div>
    )
}

export default Footer
