'use client';
import { Box, CssBaseline } from '@mui/material';
import React from 'react';
import { EnglishLayoutDrawer } from '@/components/commons/layout/EnglishLayoutDrawer';
import { EnglishLayoutSmartphone } from '@/components/commons/layout/EnglishLayoutSmartphone';
import { SettingDialog } from '@/components/commons/settings/SettingDialog';

export const EnglishLayout = (props: { children: React.ReactNode }) => {
  const [settingDialogOpen, setSettingDialogOpen] =
    React.useState<boolean>(false);
  return (
    <EnglishLayoutSmartphone
      onSettingDialogOpen={() => setSettingDialogOpen(true)}
    >
      <Box pr={0} display="flex" maxWidth="100%">
        <CssBaseline />
        <EnglishLayoutDrawer
          onSettingDialogOpen={() => setSettingDialogOpen(true)}
        />
        <Box flexGrow={1} maxWidth="100%">
          {props.children}
        </Box>
      </Box>
      <SettingDialog
        onClose={() => setSettingDialogOpen(false)}
        open={settingDialogOpen}
      />
    </EnglishLayoutSmartphone>
  );
};
