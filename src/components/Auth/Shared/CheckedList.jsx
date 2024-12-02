import { GoCheckCircle, GoCheckCircleFill } from 'react-icons/go';
import React from 'react';

export default function CheckedList({ props, mention }) {
  return (
    <li className="mb-2 flex items-center">
      <span role="img" aria-label="check" className="flex text-md">
        {props ? (
          <GoCheckCircleFill className="text-emerald" />
        ) : (
          <GoCheckCircle className="text-emerald" />
        )}
      </span>{' '}
      <span className="ml-3 text-xs">{mention}</span>
    </li>
  );
}
