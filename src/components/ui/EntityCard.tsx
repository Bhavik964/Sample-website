import { Card, Avatar, Text, Group, Badge, ActionIcon, Tooltip } from '@mantine/core';
import { IconEye, IconCheck, IconX } from '@tabler/icons-react';
import { ReactNode } from 'react';

interface EntityCardProps {
  title: string;
  subtitle: string;
  avatar?: string | any;
  status: 'active' | 'inactive' | 'Verified' | 'Unverified';
  metadata: Array<{ label: string; value: string }>;
  onClick: () => void;
}

export const EntityCard = ({ title, subtitle, avatar, status, metadata, onClick }: EntityCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ cursor: 'pointer' }} onClick={onClick}>
      <Group justify="space-between" mb="md">
        <Group>
          {avatar && <Avatar src={avatar} size={40} radius="xl" />}
          <div>
            <Text fw={500} size="sm">
              {title}
            </Text>
            <Text size="xs" c="dimmed">
              {subtitle}
            </Text>
          </div>
        </Group>
        <Group gap="xs">
          {status && (
            <Badge color={status === 'active' || status === 'Verified' ? 'green' : 'red'} variant="light" size="sm">
              {(status === 'Verified' || status === 'Unverified') ? (
                status === 'Verified' ? <IconCheck size={14} /> : <IconX size={14} />
              ) : (
                status === 'active' ? 'active' : 'inactive'
              )}
            </Badge>
          )}
          <Tooltip label="View Details">
            <ActionIcon variant="light" size="sm">
              <IconEye size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>

      <div>
        {metadata.map((item, index) => (
          <Group key={index} justify="space-between" mb={4}>
            <Text size="xs" c="dimmed">
              {item.label}:
            </Text>
            <Text size="xs" fw={500}>
              {item.value}
            </Text>
          </Group>
        ))}
      </div>
    </Card>
  );
};

export default EntityCard;