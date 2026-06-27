import React, { useState } from 'react';
import { FaChevronDown } from 'lucide-react';
import { 
  Card,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  Box,
  Button,
  useDisclosure,
  Collapse,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  HStack,
  Divider,
  Link
} from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';
import { TbChevronRight, TbChevronLeft } from 'react-icons/tb';

export default function PricingPlan() {
  const { isOpen, onToggle } = useDisclosure();
  const [activeTab, setActiveTab] = useState('monthly');

  const plans = [
    {
      name: 'Starter',
      price: '$9.99',
      features: ['Feature 1', 'Feature 2'],
      description: 'Ideal for small businesses and individuals',
      details: [
        { name: 'Storage', value: '10 GB' },
        { name: 'Bandwidth', value: '100 GB' },
        { name: 'Users', value: '10' },
      ],
    },
    {
      name: 'Premium',
      price: '$49.99',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      description: 'Ideal for businesses and organizations',
      details: [
        { name: 'Storage', value: '100 GB' },
        { name: 'Bandwidth', value: '1 TB' },
        { name: 'Users', value: '100' },
      ],
    },
    {
      name: 'Enterprise',
      price: '$99.99',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
      description: 'Ideal for large enterprises and organizations',
      details: [
        { name: 'Storage', value: '1 TB' },
        { name: 'Bandwidth', value: '10 TB' },
        { name: 'Users', value: '1,000' },
      ],
    },
  ];

  return (
    <Container maxW="7xl" p={12} bg="gray.800" rounded="xl" shadow="soft-double">
      <Heading as="h1" size="lg" mb={4} color="indigo.600" fontWeight="bold">
        Pricing Plan
      </Heading>
      <Text mb={8}>
        Choose a plan that suits your needs. Upgrade and downgrade at any time.
      </Text>
      <HStack mb={8} justify="space-between">
        <Button variant="outline" size="lg" bg="gray.800" color="gray.400" _hover={{ bg: 'gray.700' }} onClick={() => setActiveTab('monthly')}>
          Monthly
        </Button>
        <Button variant="outline" size="lg" bg="gray.800" color="gray.400" _hover={{ bg: 'gray.700' }} onClick={() => setActiveTab('annually')}>
          Annually
        </Button>
      </HStack>
      <Accordion defaultIndex={0} allowMultiple={true}>
        {plans.map((plan, index) => (
          <AccordionItem key={index} index={index} mb={4}>
            {({ isExpanded }) => (
              <>
                <AccordionButton
                  bg="gray.800"
                  _expanded={{ bg: 'gray.700' }}
                  _focus={{ boxShadow: 'none' }}
                  py={4}
                  pl={4}
                  pr={4}
                  justify="space-between"
                  align="center"
                >
                  <Flex justify="space-between" align="center" w="full">
                    <Box>
                      <Heading as="h2" size="lg" mb={2} color="indigo.600" fontWeight="bold">
                        {plan.name}
                      </Heading>
                      <Text color="gray.400" fontSize="lg">
                        {plan.description}
                      </Text>
                    </Box>
                    <Box>
                      <Heading as="h2" size="lg" mb={2} color="indigo.600" fontWeight="bold">
                        {plan.price}
                      </Heading>
                      <Text color="gray.400" fontSize="lg">
                        {plan.features.length} features
                      </Text>
                    </Box>
                    <Box>
                      <BsChevronDown size={20} color="gray.400" />
                    </Box>
                  </Flex>
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <VStack spacing={4} align="stretch">
                    <Text fontSize="lg" color="gray.400">
                      Features:
                    </Text>
                    <HStack spacing={2}>
                      {plan.features.map((feature, index) => (
                        <Text key={index} bg="gray.700" p={2} borderRadius="xl" color="white">
                          {feature}
                        </Text>
                      ))}
                    </HStack>
                    <Text fontSize="lg" color="gray.400">
                      Details:
                    </Text>
                    <HStack spacing={2}>
                      {plan.details.map((detail, index) => (
                        <Text key={index} bg="gray.700" p={2} borderRadius="xl" color="white">
                          {detail.name}: {detail.value}
                        </Text>
                      ))}
                    </HStack>
                  </VStack>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
      <Button variant="outline" size="lg" bg="gray.800" color="gray.400" _hover={{ bg: 'gray.700' }} mb={4}>
        Upgrade Now
      </Button>
    </Container>
  );
}