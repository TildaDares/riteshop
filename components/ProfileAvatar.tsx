import * as React from 'react';
import { Avatar } from '@mui/material';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name: string) {
  const splitedName = name.split(' ')
  return {
    sx: {
      bgcolor: stringToColor(name),
      color: '#0d0c22'
    },
    children: `${splitedName[0][0]}${splitedName.length > 1 ? splitedName[1][0] : ''}`,
  };
}

export default function ProfileAvatar({ name }: { name: string }) {
  return (
    <Avatar {...stringAvatar(name)} />
  );
}
