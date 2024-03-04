import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const NotFoundView = () => {
  const { t } = useTranslation("common");

  return (
    <Box
      px={3}
      minHeight="65vh"
      textAlign="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" sx={{ mb: 2 }} className="uppercase">
          {t("error404")}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          {t("pageNotFound")}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          {t("pageNotFoundDescription")}
        </Typography>
        <Box>
          <Link href="/" passHref>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Button>
                {t("backToHome")}
              </Button>
            </motion.div>
          </Link>
        </Box>
      </motion.div>
    </Box>
  );
};

export default NotFoundView;
