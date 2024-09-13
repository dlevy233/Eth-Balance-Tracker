// src/components/AddressInput.tsx
import React, { useState } from 'react';

interface AddressInputProps {
  onSubmit: (address: string) => void;
}

const AddressInput: React.FC<AddressInputProps> = ({ onSubmit }) => {
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(address);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
        style={{ width: '300px' }}
      />
      <button type="submit">Track Balance</button>
    </form>
  );
};

export default AddressInput;
