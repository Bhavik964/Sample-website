
import { Card, Text, Group, Badge, ActionIcon, Tooltip, Box, Progress, rem } from '@mantine/core';
import { IconEye, IconCalendar, IconUsers, IconTrendingUp } from '@tabler/icons-react';

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  progress: number;
  budget: number;
  startDate: string;
  endDate: string;
  teamSize: number;
  onClick: () => void;
}

export const ProjectCard = ({ 
  name, 
  description, 
  status, 
  progress, 
  budget, 
  startDate, 
  endDate, 
  teamSize, 
  onClick 
}: ProjectCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'in-progress': return 'blue';
      case 'planning': return 'yellow';
      case 'on-hold': return 'red';
      default: return 'gray';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'green';
    if (progress >= 50) return 'blue';
    if (progress >= 25) return 'yellow';
    return 'red';
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
          <Text size="sm" c="#6b7280" lineClamp={2}>
            {description}
          </Text>
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
      
      <Box mb="md">
        <Group justify="space-between" mb="xs">
          <Text size="sm" c="#6b7280">Progress</Text>
          <Text size="sm" fw={600} c="#111827">{progress}%</Text>
        </Group>
        <Progress value={progress} color={getProgressColor(progress)} size="sm" />
      </Box>

      <Group justify="space-between" mb="xs">
        <Group gap="xs">
          <IconCalendar size={16} color="#6b7280" />
          <Text size="sm" c="#6b7280">
            {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
          </Text>
        </Group>
      </Group>

      <Group justify="space-between">
        <Group gap="xs">
          <IconUsers size={16} color="#6b7280" />
          <Text size="sm" c="#6b7280">
            {teamSize} members
          </Text>
        </Group>
        <Group gap="xs">
          <IconTrendingUp size={16} color="#059669" />
          <Text size="sm" fw={600} c="#059669">
            ${budget.toLocaleString()}
          </Text>
        </Group>
      </Group>
    </Card>
  );
};
