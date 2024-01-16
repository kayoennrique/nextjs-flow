import { Footer } from '../commons/Footer';
import { Menu } from '../commons/Menu';
import { PageFAQDisplayQuestionsSection } from './PageFAQDisplayQuestionsSection';
import { PageHomeHeroSection } from './PageHomeHeroSection';
import { SEOBlock } from './SeoBlock';

export const cmsSections = {
  PagefaqDisplayquestionSectionRecord: PageFAQDisplayQuestionsSection,
  CommonSeoBlockRecord: SEOBlock,
  CommonMenuRecord: (props) => <Menu {...props} />,
  PagehomeHerosectionRecord: PageHomeHeroSection,
  CommonFooterRecord: (props) => <Footer {...props} />,
}
