import { Grid, SimpleGrid, Paper, Text, Group, Box, rem } from '@mantine/core';
import { IconTrendingUp, IconUsers, IconEye, IconRefresh, IconMapPin, IconUserCheck, IconUserX } from '@tabler/icons-react';
import { AreaChart, DonutChart } from '@mantine/charts';
import { StatsCard } from '../../components/ui/StatsCard';

const salesData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 4500 },
  { month: 'May', sales: 6000 },
  { month: 'Jun', sales: 5500 },
];

const categoryData = [
  { name: 'Electronics', value: 56.2, color: '#000000' },
  { name: 'Fashion', value: 25.5, color: '#6c757d' },
  { name: 'Home & Garden', value: 18.3, color: '#adb5bd' },
];

export const DashboardPage = () => {
  return (
    <Box p="xl">
      <Text size="xl" fw={700} mb="xs" c="#000000">
        Dashboard Overview
      </Text>
      <Text size="sm" c="#6c757d" mb="xl">
        Here's what's happening with your platform today.
      </Text>

      {/* People Analytics */}
      <Text size="lg" fw={600} mb="md" c="#000000">
        People Analytics
      </Text>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg" mb="xl">
        <StatsCard
          title="Total People"
          value="2,847"
          diff={14.2}
          icon={<IconUsers size={24} />}
        />
        <StatsCard
          title="Active Users"
          value="2,234"
          diff={12.5}
          icon={<IconUserCheck size={24} />}
        />
        <StatsCard
          title="Inactive Users"
          value="613"
          diff={-3.2}
          icon={<IconUserX size={24} />}
        />
        <StatsCard
          title="Growth Rate"
          value="18.4%"
          diff={8.1}
          icon={<IconTrendingUp size={24} />}
          dark={true}
        />
      </SimpleGrid>

      {/* Territory Analytics */}
      <Text size="lg" fw={600} mb="md" c="#000000">
        Territory Analytics
      </Text>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg" mb="xl">
        <StatsCard
          title="Total Territories"
          value="156"
          diff={5.8}
          icon={<IconMapPin size={24} />}
        />
        <StatsCard
          title="Active Territories"
          value="142"
          diff={3.2}
          icon={<IconEye size={24} />}
        />
        <StatsCard
          title="Coverage"
          value="91.2%"
          diff={2.1}
          icon={<IconRefresh size={24} />}
        />
        <StatsCard
          title="Efficiency"
          value="87.5%"
          diff={12.3}
          icon={<IconTrendingUp size={24} />}
          dark={true}
        />
      </SimpleGrid>

      {/* Charts Section */}
      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Paper p="xl" radius="12" style={{ border: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}>
            <Group justify="space-between" mb="lg">
              <Text fw={700} size="lg" c="#000000">
                Performance Metrics
              </Text>
              <Group gap="xs">
                <Text size="sm" c="#6c757d">Export data</Text>
                <Text size="sm" c="#6c757d">Last 30 days</Text>
              </Group>
            </Group>

            <AreaChart
              h={300}
              data={salesData}
              dataKey="month"
              series={[
                { name: 'sales', color: '#000000' },
              ]}
              curveType="natural"
              gridAxis="xy"
              withGradient
              style={{
                '--mantine-color-gray-6': '#000000',
              }}
            />
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper p="xl" radius="12" style={{ border: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}>
            <Text fw={700} size="lg" mb="lg" c="#000000">
              Distribution
            </Text>

            <DonutChart
              data={categoryData}
              tooltipDataSource="segment"
              mx="auto"
              size={200}
              thickness={30}
            />

            <Box mt="lg">
              {categoryData.map((item) => (
                <Group key={item.name} justify="space-between" mb="xs">
                  <Group gap="xs">
                    <Box
                      style={{
                        width: rem(12),
                        height: rem(12),
                        backgroundColor: item.color,
                        borderRadius: rem(2),
                      }}
                    />
                    <Text size="sm" c="#000000">{item.name}</Text>
                  </Group>
                  <Text size="sm" fw={600} c="#000000">
                    {item.value}%
                  </Text>
                </Group>
              ))}
            </Box>
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
};
