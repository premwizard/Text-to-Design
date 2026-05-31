import React from 'react';
import Card from './Card';

export function CardsGrid({ items = [] }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <Card key={index} {...item} variant="standard" />
      ))}
    </div>
  );
}

export function CardsGlass({ items = [] }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <Card key={index} {...item} variant="glass" />
      ))}
    </div>
  );
}

export function CardsMinimal({ items = [] }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <Card key={index} {...item} variant="minimal" />
      ))}
    </div>
  );
}

export function CardsStats({ items = [] }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <Card key={index} {...item} variant="stats" />
      ))}
    </div>
  );
}

export function CardsMasonry({ items = [] }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      {items.map((item, index) => (
        <div key={index} className="break-inside-avoid">
          <Card {...item} variant="standard" />
        </div>
      ))}
    </div>
  );
}

export default function Cards(props) {
  const { variant = 'grid' } = props;
  if (variant === 'glass') return <CardsGlass {...props} />;
  if (variant === 'minimal') return <CardsMinimal {...props} />;
  if (variant === 'stats') return <CardsStats {...props} />;
  if (variant === 'masonry') return <CardsMasonry {...props} />;
  return <CardsGrid {...props} />;
}
