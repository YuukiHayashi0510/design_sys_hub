import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const FAKE_POST = 40

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'seed user',
      email: 'seed@test.com',
    },
  })

  const fakePostList = []
  for (let i = 0; i < FAKE_POST; i++)
    fakePostList.push({
      name: faker.internet.domainName(),
      description: faker.lorem.sentences(),
      image: faker.image.url(),
      url: faker.internet.url(),
      userId: user.id,
    })

  await prisma.post.createMany({
    data: [
      {
        name: 'Material UI for Figma (and MUI X)',
        description:
          'Figma Community file - This is a community version of Material UI for Figma, a UI kit with handcrafted components for Figma.',
        image:
          'https://s3-alpha.figma.com/hub/file/3913238047/3e09af18-aa0e-4708-98cc-fe40bacd4a51-cover.png',
        url: 'https://www.figma.com/community/file/912837788133317724/Material-UI-for-Figma-(and-MUI-X)',
        userId: user.id,
      },
      {
        name: 'デジタル庁 | デザインシステム',
        description:
          'Figma Community file - デジタル庁サービスデザインユニットでは、一貫したデザインや操作性でウェブサイトやアプリを提供するための仕組み「デザインシステム」の構築に取り組んでいます。どなたでも構築中のデザインシステムのデザインデータを閲覧することができます。\n\nデザインシステムについての詳細や更新履歴はデジタル庁ウェブサイトをご覧ください。\n\n※Figma Communityにて公開中のデータは、Figma Communityの規定によりCC BY 4.0のライセンスが表記されます。ただし、このファイル内のイラストレーション・アイコン素材に関してはデジタル庁ウェブサイトに掲載の「イラストレーション・アイコン素材利用...',
        image:
          'https://s3-alpha.figma.com/hub/file/3906680432/31e2dd62-ad77-423a-84bf-4f8f5d2856e4-cover.png',
        url: 'https://www.figma.com/community/file/1255349027535859598/Design-System-1.3.3',
        userId: user.id,
      },
      {
        name: 'Primer Web',
        description:
          'Figma Community file - Primer Web is the Figma library of UI components that make the desktop experience for GitHub.\n\nFor more information about Primer, visit https://primer.style\n',
        image:
          'https://s3-alpha.figma.com/hub/file/3697437053/a8844693-c96f-4fc0-ae8b-a0a344cc117b-cover.png',
        url: 'https://www.figma.com/community/file/854767373644076713/Primer-Web',
        userId: user.id,
      },
      {
        name: 'Apple Design Resources - visionOS',
        description:
          'Figma Community file - Apple’s initial visionOS design kit for Figma contains a comprehensive set of UI components, views, system interfaces, text styles, color styles, and materials. All of the core ingredients you need to quickly create highly realistic visionOS app designs.\n\nIf you have requests, find bugs, or have ...',
        image:
          'https://s3-alpha.figma.com/hub/file/3694599318/ea5809fc-c32f-4139-8be3-593c016c5fba-cover.png',
        url: 'https://www.figma.com/community/file/1253443272911187215/Apple-Design-Resources---visionOS',
        userId: user.id,
      },
      {
        name: 'Design and code Windows apps - Windows apps',
        description:
          'Design guidelines and UI code examples for creating Windows app experiences.',
        image: 'https://learn.microsoft.com/en-us/media/open-graph-image.png',
        url: 'https://learn.microsoft.com/en-us/windows/apps/design/',
        userId: user.id,
      },
      {
        name: 'SLDS Components - Web',
        description:
          'Figma Community file - This library contains all of the Lightning Design System components for the web. This mirrors what you can find on https://lightningdesignsystem.com\n',
        image:
          'https://s3-alpha.figma.com/hub/file/640534500/1f807c7a-8839-4713-8f2f-ef5d65d676d0-cover.png',
        url: 'https://www.figma.com/community/file/854593583696357016/SLDS-Components---Web',
        userId: user.id,
      },
      ...fakePostList,
    ],
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
