export function generateStaticParams() {
  return [
    { projectId: 'welle' },
    { projectId: 'bvg' },
    { projectId: 'eisenhower' },
    { projectId: 'encryptnotes' },
  ];
}

import { HeroProject } from '@/app/components/project/HeroProject';
import ProjectModal from '@/app/clientComponents/ProjectModal';
import { ProjectIds, projectsData } from '@/lib/projectsData';
import { ProjectFeatures } from '@/app/components/project/ProjectFeatures';
import initTranslations from '@/app/i18n';
import { TranslatedProjectsData } from '@/app/projects/[projectId]/page';
import { getLocale } from '@/lib/getLocale';

export default async function ProjectPageForModal({
  params,
}: {
  params: Promise<{ projectId: ProjectIds }>;
}) {
  const { projectId } = await params;

  const locale = await getLocale();

  const { t } = await initTranslations(locale, ['projectsFeatures', 'common']);

  const translatedProjectsData = t(projectId, {
    returnObjects: true,
  }) as TranslatedProjectsData;

  const projectData = projectsData[projectId];

  return (
    <ProjectModal>
      <HeroProject
        t={t}
        projectData={projectData}
        translatedProjectsData={translatedProjectsData}
      />
      <ProjectFeatures
        t={t}
        projectData={projectData}
        translatedProjectsData={translatedProjectsData}
      />
    </ProjectModal>
  );
}
