import { Stack } from '@mantine/core';
import styled from '@emotion/styled';
import { ReactFlowProvider } from 'react-flow-renderer';
import { useNavigate, useParams } from 'react-router-dom';

import PageContainer from '../../components/layout/components/PageContainer';
import { ArrowButton, colors, Title, Text, Button } from '../../design-system';
import { parseUrl } from '../../utils/routeUtils';
import { ROUTES } from '../../constants/routes.enum';
import { DigestDemoFlow } from '../../components';
import { useSegment } from '../../components/providers/SegmentProvider';
import { DigestPlaygroundAnalyticsEnum } from './constants';

const Heading = styled(Title)`
  color: ${colors.B40};
  font-size: 40px;
`;

const SubHeading = styled(Text)`
  font-size: 20px;
`;

const LinkStyled = styled.a`
  font-size: 16px;
  color: #2b85df;
  text-decoration: underline;
`;

export const TemplatesDigestPlaygroundPage = () => {
  const segment = useSegment();
  const { templateId = '' } = useParams<{ templateId: string }>();
  const navigate = useNavigate();

  const handleBackClick = () => {
    segment.track(DigestPlaygroundAnalyticsEnum.BACK_BUTTON_CLICK);
    navigate(-1);
  };

  const handleSetupDigestWorkflowClick = () => {
    segment.track(DigestPlaygroundAnalyticsEnum.SETUP_DIGEST_WORKFLOW_CLICK);
    localStorage.setItem('tour-digest', '0');
    navigate(`${parseUrl(ROUTES.TEMPLATES_EDIT_TEMPLATEID, { templateId })}`);
  };

  const handleLearnMoreClick = () => {
    segment.track(DigestPlaygroundAnalyticsEnum.LEARN_MORE_IN_DOCS_CLICK);
  };

  const handleRunTriggerClick = () => {
    segment.track(DigestPlaygroundAnalyticsEnum.RUN_TRIGGER_CLICK);
  };

  const handleDigestIntervalChange = (interval: number) => {
    segment.track(DigestPlaygroundAnalyticsEnum.DIGEST_INTERVAL_CHANGE, { interval });
  };

  return (
    <ReactFlowProvider>
      <PageContainer title="Digest Workflow Playground" style={{ padding: '32px' }}>
        <ArrowButton label="Go Back" onClick={handleBackClick} />
        <Stack mt={20} spacing="xs" align="center">
          <Heading>Digest Workflow Playground</Heading>
          <SubHeading>The digest engine aggregates multiple events into a precise notification</SubHeading>
        </Stack>
        <Stack mt={40} align="center">
          <DigestDemoFlow
            isReadOnly={false}
            templateId={templateId}
            onRunTriggerClick={handleRunTriggerClick}
            onDigestIntervalChange={handleDigestIntervalChange}
          />
        </Stack>
        <Stack mt={40} mb={40} align="center">
          <Button onClick={handleSetupDigestWorkflowClick}>Set Up Digest Workflow</Button>
          <LinkStyled
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.novu.co/platform/digest"
            onClick={handleLearnMoreClick}
          >
            Learn more in docs
          </LinkStyled>
        </Stack>
      </PageContainer>
    </ReactFlowProvider>
  );
};
