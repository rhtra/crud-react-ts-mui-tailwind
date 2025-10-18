import React from "react";
import { Modal, Box, Typography } from "@mui/material";

interface ModalWrapperProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  open,
  title,
  onClose,
  children,
  width = 420,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: "12px",
          width,
          p: 4,
        }}
      >
        <Typography variant="h6" className="font-semibold mb-4 text-center">
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default ModalWrapper;
