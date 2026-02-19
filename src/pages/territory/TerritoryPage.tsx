import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SimpleGrid, Text, Tabs, Box, Group, Pagination } from '@mantine/core';
import { IconMapPin, IconMap2, IconChartArea, IconBuilding } from '@tabler/icons-react';
import { Landmark } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatsCard } from '../../components/ui/StatsCard';
import { EntityCard } from '../../components/ui/EntityCard';
import { LandCard } from '../../components/territory/LandCard';
import { ProjectCard } from '../../components/territory/ProjectCard';
import { DetailsSidebar } from '../../components/ui/DetailsSidebar';
import { getTerritoryDataRequest } from '@/store/slices/territorySlice';
import sortBy from 'lodash/sortBy';
import moment from 'moment';

// Mock data for lands and projects
const mockLands = [
  {
    id: '1',
    name: 'Central Park Plot',
    location: 'Downtown District',
    area: 5000,
    status: 'available' as const,
    price: 250000,
    coordinates: { lat: 40.7829, lng: -73.9654 }
  },
  {
    id: '2',
    name: 'Riverside Estate',
    location: 'Riverside Area',
    area: 8500,
    status: 'occupied' as const,
    price: 450000,
    coordinates: { lat: 40.7589, lng: -73.9851 }
  },
  {
    id: '3',
    name: 'Hill View Land',
    location: 'Hill Station',
    area: 3200,
    status: 'reserved' as const,
    price: 180000,
    coordinates: { lat: 40.7505, lng: -73.9934 }
  },
];

const mockProjects = [
  {
    id: '1',
    name: 'Smart City Initiative',
    description: 'Development of smart infrastructure with IoT integration and sustainable energy solutions.',
    status: 'in-progress' as const,
    progress: 65,
    budget: 2500000,
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    teamSize: 24
  },
  {
    id: '2',
    name: 'Green Housing Complex',
    description: 'Eco-friendly residential complex with solar panels and rainwater harvesting systems.',
    status: 'planning' as const,
    progress: 25,
    budget: 1800000,
    startDate: '2024-03-01',
    endDate: '2025-06-30',
    teamSize: 18
  },
  {
    id: '3',
    name: 'Commercial Hub',
    description: 'Modern commercial center with retail spaces, offices, and entertainment facilities.',
    status: 'completed' as const,
    progress: 100,
    budget: 3200000,
    startDate: '2023-06-01',
    endDate: '2024-02-28',
    teamSize: 32
  },
];

const PAGE_SIZES = [10, 20, 30, 50, 100];

export const TerritoryPage = () => {
  const dispatch = useDispatch();
  const territoryData = useSelector((state: any) => state.territory.territoryData?.result?.territories || []);
  const totalRecords = useSelector((state: any) => state.territory.territoryData?.result?.total || 0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [search, setSearch] = useState('');
  const [sortStatus, setSortStatus] = useState<any>({ columnAccessor: 'title', direction: 'asc' });
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [sourceFilter, setSourceFilter] = useState<any[]>([]);
  const [emailVerificationStatus, setEmailVerificationStatus] = useState('');
  const [phoneVerificationStatus, setPhoneVerificationStatus] = useState('');
  const [platform, setPlatform] = useState('');
  const [selectedTerritory, setSelectedTerritory] = useState<any>(false); // Initialized as null to prevent auto-open

  const refreshTerritoryData = useCallback(() => {
    dispatch(getTerritoryDataRequest({
      page,
      pageSize,
      search,
      userCategory: sourceFilter.map((item) => item.value).join(','),
    }));
  }, [dispatch, page, pageSize, search, emailVerificationStatus, phoneVerificationStatus, platform, sourceFilter]);

  useEffect(() => {
    refreshTerritoryData();
  }, [dispatch, page, pageSize, refreshTerritoryData]);

  useEffect(() => {
    const sortedData = sortBy(territoryData, sortStatus.columnAccessor);
    // setSelectedTerritory(sortStatus.direction === 'desc' ? sortedData.reverse() : sortedData);
  }, [territoryData, sortStatus]);

  const handleTerritoryClick = (territory: any) => {
    setSelectedTerritory(territory);
  };

  const handleLandClick = (land: any) => {
    console.log('Land clicked:', land);
  };

  const handleProjectClick = (project: any) => {
    console.log('Project clicked:', project);
  };

  const handleCloseSidebar = () => {
    setSelectedTerritory(null);
  };

  const analytics = {
    total: totalRecords,
    active: territoryData.filter((t: any) => t.status === 'ACTIVE').length,
    inactive: territoryData.filter((t: any) => t.status === 'INACTIVE').length,
    totalArea: territoryData.reduce((sum: number, t: any) => sum + (t.area || 0), 0),
  };

  const territoryDetails = selectedTerritory ? [
    { label: 'Code', value: selectedTerritory.code || 'N/A' },
    { label: 'City', value: `${selectedTerritory.city}, ${selectedTerritory.state}` || 'N/A' },
    { label: 'Territory Head', value: selectedTerritory.territoryHead || 'N/A' },
    { label: 'Created', value: moment(selectedTerritory.createdAt).format('DD/MM/YYYY HH:mm:ss') || 'N/A' },
    { label: 'Updated', value: moment(selectedTerritory.updatedAt).format('DD/MM/YYYY HH:mm:ss') || 'N/A' },
    ...(selectedTerritory.tpDetails?.length > 0
      ? [{ label: 'Town Planning Details', value: selectedTerritory.tpDetails.map((tp: any) => tp.title).join(', ') }]
      : []),
    ...(selectedTerritory.anchorDeveloper ? [{ label: 'Developer', value: selectedTerritory.anchorDeveloper }] : []),
    ...(selectedTerritory.office ? [{ label: 'Office', value: selectedTerritory.office }] : []),
    ...(selectedTerritory.focus ? [{ label: 'Focus', value: selectedTerritory.focus }] : []),
    ...(selectedTerritory.purpose ? [{ label: 'Purpose', value: selectedTerritory.purpose }] : []),
    ...(selectedTerritory.vision ? [{ label: 'Vision', value: selectedTerritory.vision }] : []),
    ...(selectedTerritory.opportunities ? [{ label: 'Opportunities', value: selectedTerritory.opportunities }] : []),
    ...(selectedTerritory.risks ? [{ label: 'Risks', value: selectedTerritory.risks }] : []),
  ] : [];

  return (
    <Box p={{ base: 'sm', sm: 'md', lg: 'xl' }}>
      <PageHeader
        title="Territory Management"
        description="Manage territories, lands, and projects in your system"
      />

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg" mb="xl">
        <StatsCard
          title="Total Territories"
          value={analytics.total}
          color="blue"
          icon={<IconMapPin size={24} />}
        />
        <StatsCard
          title="Active"
          value={analytics.active}
          color="green"
          icon={<IconMap2 size={24} />}
        />
        <StatsCard
          title="Inactive"
          value={analytics.inactive}
          color="red"
          icon={<IconMapPin size={24} />}
        />
        <StatsCard
          title="Total Area"
          value={`${analytics.totalArea.toLocaleString()} km²`}
          color="teal"
          icon={<IconChartArea size={24} />}
        />
      </SimpleGrid>

      <Group mb="lg" align="center">
        <Text fz="lg" fw={600}>Territories</Text>
      </Group>

      <Tabs value={activeTab} onChange={setActiveTab} variant="pills">
        <Tabs.List mb="lg">
          <Tabs.Tab value="overview" leftSection={<IconMapPin size={16} />}>
            Overview
          </Tabs.Tab>
          <Tabs.Tab value="land" leftSection={<Landmark size={16} />}>
            Land
          </Tabs.Tab>
          <Tabs.Tab value="projects" leftSection={<IconBuilding size={16} />}>
            Projects
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="overview">
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing="lg">
            {territoryData.map((territory: any) => (
              <EntityCard
                key={territory._id}
                title={territory.title}
                subtitle={territory.code}
                status={territory.status.toLowerCase() as 'active' | 'inactive'}
                metadata={[
                  { label: 'City', value: `${territory.city}, ${territory.state}` },
                  { label: 'Head', value: territory.territoryHead },
                  { label: 'Created', value: moment(territory.createdAt).format('DD/MM/YYYY') },
                ]}
                onClick={() => handleTerritoryClick(territory)}
              />
            ))}
          </SimpleGrid>
        </Tabs.Panel>

        <Tabs.Panel value="land">
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing="lg">
            {mockLands.map((land) => (
              <LandCard
                key={land.id}
                {...land}
                onClick={() => handleLandClick(land)}
              />
            ))}
          </SimpleGrid>
        </Tabs.Panel>

        <Tabs.Panel value="projects">
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
            {mockProjects.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </SimpleGrid>
        </Tabs.Panel>
      </Tabs>

      <Group mt="lg" justify="space-between" align="center">
        <Text>
          Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, totalRecords)} of {totalRecords} entries
        </Text>
        <Pagination
          total={Math.ceil(totalRecords / pageSize)}
          value={page}
          onChange={setPage}
          siblings={1}
        />
      </Group>

      <DetailsSidebar
        opened={!!selectedTerritory}
        onClose={handleCloseSidebar}
        title={selectedTerritory?.title || ''}
        subtitle={selectedTerritory?.code || ''}
        status={selectedTerritory?.status?.toLowerCase() || ''}
        details={territoryDetails}
      />
    </Box>
  );
};

export default TerritoryPage;