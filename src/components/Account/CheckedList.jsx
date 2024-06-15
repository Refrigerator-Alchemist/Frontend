import React from 'react';
import { GoCheckCircle, GoCheckCircleFill } from 'react-icons/go';

export default function CheckedList({ props, mention }) {
  return (
    <li className="mb-2 flex items-center">
      <span role="img" aria-label="check" className="flex">
        {props ? (
          <GoCheckCircleFill className="text-emerald" />
        ) : (
          <GoCheckCircle className="text-emerald" />
        )}
      </span>{' '}
      <span className="ml-3">{mention}</span>
    </li>
  );
}
