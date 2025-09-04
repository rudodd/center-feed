// import components
import {
  Card,
  CardSection,
  SkeletonBlock,
  SkeletonParagraph
} from '@guwmi/ui';

export default function ArticleSkeleton() {

  return (
    <Card className="article">
      <SkeletonBlock height={185} />
      <CardSection>
        <div className="source">
          <SkeletonBlock height={20} width={20} />
          <SkeletonBlock height={15} width={100} />
        </div>
        <div className="title">
          <SkeletonParagraph numLines={2} />
        </div>
      </CardSection>
      <CardSection>
        <div className="bias">
          <SkeletonParagraph numLines={1} />
        </div>
      </CardSection>
    </Card>
  )
}