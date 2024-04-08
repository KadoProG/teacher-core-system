import { Toolbar } from '@mui/material';
import React from 'react';

interface EnglishLayoutToolbarProps {
  children?: React.ReactNode;
}

export const EnglishLayoutToolbar: React.FC<EnglishLayoutToolbarProps> = (
  props
) => <Toolbar variant="dense">{props.children}</Toolbar>;
