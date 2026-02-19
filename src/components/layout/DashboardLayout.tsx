import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppShell,
  Text,
  Group,
  ActionIcon,
  Avatar,
  Menu,
  UnstyledButton,
  Stack,
  Box,
  Burger,
  ScrollArea,
  TextInput,
  rem,
  Divider,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconUsers,
  IconMapPin,
  IconDashboard,
  IconLogout,
  IconSettings,
  IconUser,
  IconSearch,
  IconBell,
} from '@tabler/icons-react';
import { useAuth } from '../../hooks/useAuth';

const navigation = [
  { name: 'Institute', href: '/dashboard', icon: IconDashboard },
  // { name: 'People', href: '/users', icon: IconUsers },
  // { name: 'Insi', href: '/territory', icon: IconMapPin },
];

export const DashboardLayout = () => {
  const [opened, { toggle, close }] = useDisclosure();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const NavItem = ({ item }: { item: typeof navigation[0] }) => {
    const isActive = location.pathname === item.href;

    const handleNavClick = () => {
      navigate(item.href);
      // Close mobile sidebar when navigation item is clicked
      close();
    };

    return (
      <UnstyledButton
        onClick={handleNavClick}
        style={{
          display: 'block',
          width: '100%',
          padding: rem(12),
          borderRadius: rem(8),
          textDecoration: 'none',
          color: isActive ? '#ffffff' : '#9ca3af',
          backgroundColor: isActive ? '#374151' : 'transparent',
          fontWeight: isActive ? 600 : 500,
          fontSize: rem(14),
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = '#374151';
            e.currentTarget.style.color = '#ffffff';
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#9ca3af';
          }
        }}
      >
        <Group gap="sm">
          <item.icon size={20} />
          <Text size="sm">{item.name}</Text>
        </Group>
      </UnstyledButton>
    );
  };

  return (
    <AppShell
      header={{ height: { base: 60, sm: 70 } }}
      navbar={{
        width: { base: 280, sm: 300 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding={{ base: 'sm', sm: 'md', lg: 'lg' }}
    >
      <AppShell.Header
        style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        <Group h="100%" px={{ base: 'md', sm: 'xl' }} justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color="#6c757d" />
            <Text
              size="xl"
              fw={700}
              c="#111827"
              hiddenFrom="base"
              visibleFrom="xs"
            >
              Welcome back,  User
            </Text>
          </Group>

          <Group gap="md">
            {/* <TextInput
              placeholder="Search..."
              leftSection={<IconSearch size={16} color="#6c757d" />}
              radius="xl"
              size="sm"
              w={300}
              visibleFrom="sm"
              styles={{
                input: {
                  backgroundColor: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  color: '#111827',
                }
              }}
            />
            <ActionIcon
              variant="light"
              size="lg"
              radius="xl"
              style={{ backgroundColor: '#f9fafb', color: '#6c757d' }}
            >
              <IconBell size={18} />
            </ActionIcon> */}

            <Menu shadow="md" width={200}>
              <Menu.Target>
                <UnstyledButton>
                  <Group gap="sm">
                    <Avatar
                      size={36}
                      radius="xl"
                      src={user?.avatar}
                      style={{ backgroundColor: '#e5e7eb' }}
                    />
                    <Box visibleFrom="sm">
                      <Text size="sm" fw={500} c="#111827">
                        { 'User'}
                      </Text>
                      <Text size="xs" c="#6b7280">
                        { 'Admin'}
                      </Text>
                    </Box>
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item leftSection={<IconUser size={14} />}>
                  Profile
                </Menu.Item>
                <Menu.Item leftSection={<IconSettings size={14} />}>
                  Settings
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  leftSection={<IconLogout size={14} />}
                  color="red"
                  onClick={handleLogout}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar
        p="md"
        style={{
          backgroundColor: '#1f2937',
          border: 'none',
        }}
      >
        <AppShell.Section>
          <Group mb="xl" px="xs">
            <Box
              style={{
                width: rem(40),
                height: rem(40),
                backgroundColor: '#ffffff',
                borderRadius: rem(8),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text size="lg" fw={700} c="#1f2937">
                R
              </Text>
            </Box>
            <Text size="lg" fw={700} c="#ffffff">
              R Core
            </Text>
          </Group>
        </AppShell.Section>

        <AppShell.Section grow component={ScrollArea}>
          <Stack gap="xs">
            {navigation.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </Stack>
        </AppShell.Section>

        <AppShell.Section>
          <Divider my="md" color="#374151" />
          <Box px="xs">
            <Text size="xs" c="#6b7280" mb={4}>
              Version
            </Text>
            <Text size="sm" fw={500} c="#9ca3af">
              v0.0.1
            </Text>
          </Box>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main
        style={{
          backgroundColor: '#f9fafb',
          minHeight: 'calc(100vh - 70px)',
        }}
      >
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
