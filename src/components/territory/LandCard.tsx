
import { Card, Text, Group, Badge, ActionIcon, Tooltip, Box, rem } from '@mantine/core';
import { IconEye, IconMapPin, IconRuler } from '@tabler/icons-react';

interface LandCardProps {
  id: string;
  name: string;
  location: string;
  area: number;
  status: 'available' | 'occupied' | 'reserved';
  price: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  onClick: () => void;
}

export const LandCard = ({ 
  name, 
  location, 
  area, 
  status, 
  price, 
  coordinates, 
  onClick 
}: LandCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'green';
      case 'occupied': return 'red';
      case 'reserved': return 'yellow';
      default: return 'gray';
    }
  };

  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="12" 
      withBorder 
      style={{ 
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: '1px solid #e5e7eb',
      }} 
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <Group justify="space-between" mb="md">
        <Box>
          <Text fw={600} size="lg" c="#111827" mb={4}>
            {name}
          </Text>
          <Group gap="xs" mb="xs">
            <IconMapPin size={16} color="#6b7280" />
            <Text size="sm" c="#6b7280">
              {location}
            </Text>
          </Group>
        </Box>
        <Group gap="xs">
          <Badge color={getStatusColor(status)} variant="light" size="sm">
            {status}
          </Badge>
          <Tooltip label="View Details">
            <ActionIcon variant="light" size="sm" color="gray">
              <IconEye size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
      
      <Group justify="space-between" mb="sm">
        <Group gap="xs">
          <IconRuler size={16} color="#6b7280" />
          <Text size="sm" c="#6b7280">
            Area: {area.toLocaleString()} sq ft
          </Text>
        </Group>
        <Text size="sm" fw={600} c="#059669">
          ${price.toLocaleString()}
        </Text>
      </Group>

      <Text size="xs" c="#9ca3af">
        Coordinates: {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
      </Text>
    </Card>
  );
};
