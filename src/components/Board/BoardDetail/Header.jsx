import React from 'react';
import BackButton from '../../Global/BackButton';
import ReportButton from './ReportButton';

export default function BoardDetailHeader({ reportPost }) {
  return (
    <header className="relative flex justify-end pt-5 pr-5">
      <BackButton destination={-1} />
      <ReportButton reportPost={reportPost} />
    </header>
  );
}
