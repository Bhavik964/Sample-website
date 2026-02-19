import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SimpleGrid, Text, Avatar } from '@mantine/core';
import { IconUsers, IconUserCheck, IconUserX, IconTrendingUp } from '@tabler/icons-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatsCard } from '../../components/ui/StatsCard';
import { EntityCard } from '../../components/ui/EntityCard';
import { DetailsSidebar } from '../../components/ui/DetailsSidebar';
import { RootState } from '../../store/store';
import { fetchDashboardData, resetFetchUserList } from '@/store/slices/dashboardSlice';
import moment from 'moment';

export const PeoplePage = () => {
  const dispatch = useDispatch();
  const dashboardUserData = useSelector((state: RootState | any) => state.dashboard);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchDashboardData({
      page,
      pageSize,
      search,
      emailVerificationStatus: '',
      phoneVerificationStatus: '',
      platform: '',
      userCategory: '',
    }));
  }, [dispatch, page, pageSize, search]);

  const handlePersonClick = (person: any) => {
    setSelectedPerson(person);
  };

  const handleCloseSidebar = () => {
    setSelectedPerson(null);
    dispatch(resetFetchUserList());
  };

  // Map dashboard analytics based on existing data
  const analytics = {
    total: dashboardUserData?.data?.result?.total || 0,
    active: dashboardUserData?.data?.result?.users?.filter((u: any) => u.isEmailVerified && u.otpVerified).length || 0,
    inactive: dashboardUserData?.data?.result?.total - (dashboardUserData?.data?.result?.users?.filter((u: any) => u.isEmailVerified && u.otpVerified).length || 0) || 0,
    growth: 0, // Adjust if growth data is available in your API
  };

  // Map users from dashboardUserData to EntityCard format
  const people = dashboardUserData?.data?.result?.users || [];

  // Prepare details for DetailsSidebar based on selected person
  const personDetails = selectedPerson
    ? [
      { label: 'Email', value: selectedPerson.email || 'N/A' },
      { label: 'Phone', value: `${selectedPerson.countryCode} ${selectedPerson.phoneNumber || 'N/A'}` },
      { label: 'Refer Code', value: selectedPerson.referCode || 'N/A' },
      { label: 'Source', value: selectedPerson.source || 'N/A' },
      { label: 'Sub Source', value: selectedPerson.subSource || 'N/A' },
      { label: 'Location', value: `${selectedPerson.city || 'N/A'}, ${selectedPerson.state || 'N/A'}` },
      { label: 'Territory', value: selectedPerson.territory || (selectedPerson.userTerritories.length > 0 ? selectedPerson.userTerritories[0]?.territoryObject?.title || 'N/A' : 'N/A') },
      { label: 'Joined Date', value: moment(selectedPerson.createdAt).format('DD/MM/YYYY') },
      { label: 'Status', value: selectedPerson.isEmailVerified && selectedPerson.otpVerified ? 'Active' : 'Inactive' },
    ]
    : [];

  return (
    <div>
      <PageHeader
        title="People"
        description="Manage and view all registered people in your organization"
      />

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md" mb="xl">
        <StatsCard
          title="Total People"
          value={analytics.total}
          diff={analytics.growth}
          color="blue"
          icon={<IconUsers size={24} />}
        />
        <StatsCard
          title="Active"
          value={analytics.active}
          color="green"
          icon={<IconUserCheck size={24} />}
        />
        <StatsCard
          title="Inactive"
          value={analytics.inactive}
          color="red"
          icon={<IconUserX size={24} />}
        />
        <StatsCard
          title="Growth"
          value={`${analytics.growth}%`}
          diff={analytics.growth}
          color="teal"
          icon={<IconTrendingUp size={24} />}
        />
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing="md">
        {people.map((person: any) => (
          <EntityCard
            key={person._id}
            title={`${person.firstName || ''} ${person.lastName || ''}`.trim() || 'N/A'}
            subtitle={`${person.countryCode}-${person.phoneNumber || 'N/A'}`}
            avatar={person.profileImage ? `${dashboardUserData?.data?.result?.profilePath}${person.profileImage}` : <Avatar radius="xl" size={40}><IconUsers size={24} /></Avatar>}
            status={person.otpVerified ? 'Verified' : 'Unverified'}
            metadata={[
              { label: 'referCode', value: person.referCode || 'N/A' },
              { label: 'Location', value: `${person.city || 'N/A'}, ${person.state || 'N/A'}` },
              { label: 'Territory', value: person.territory || (person.userTerritories.length > 0 ? person.userTerritories[0]?.territoryObject?.title || 'N/A' : 'N/A') },
            ]}
            onClick={() => handlePersonClick(person)}
          />
        ))}
      </SimpleGrid>

      <DetailsSidebar
        opened={!!selectedPerson}
        onClose={handleCloseSidebar}
        title={selectedPerson?.firstName ? `${selectedPerson.firstName} ${selectedPerson.lastName}`.trim() || 'Unnamed User' : ''}
        subtitle={selectedPerson?.email || `${selectedPerson?.countryCode}-${selectedPerson?.phoneNumber || 'N/A'}`}
        avatar={selectedPerson?.profileImage ? `${dashboardUserData?.data?.result?.profilePath}${selectedPerson.profileImage}` : <Avatar radius="xl" size={60}><IconUsers size={32} /></Avatar>}
        status={selectedPerson?.otpVerified ? 'Verified' : 'Unverified'}
        details={personDetails}
      />
    </div>
  );
};