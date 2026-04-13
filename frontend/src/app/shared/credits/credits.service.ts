import { Injectable } from '@angular/core';

export interface Credit {
  /** Author/creator display name */
  name: string;
  /** Full URL to the creator's profile or page */
  link: string;
  /** Source site display name, e.g. "www.freeicons.io" */
  from: string;
  /** List of asset paths this credit covers */
  pictures: string[];
}

// ─── How to add a new credit ─────────────────────────────────────────────────
// When you add a third-party image or icon that requires attribution, push a
// new object into the array below. Example:
//
// {
//   name: 'Author Name',
//   link: 'https://www.freeicons.io/profile/12345',
//   from: 'www.freeicons.io',
//   pictures: ['assets/svg/example-icon.svg'],
// },
// ─────────────────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class CreditsService {
  /**
   * All third-party image and icon credits required by the respective
   * licenses. Attributions carried over from hans-fischer.com/impressum
   * for the icons reused in this project.
   */
  readonly credits: Credit[] = [
    {
      name: 'worldvectorlogo',
      link: 'https://worldvectorlogo.com',
      from: 'worldvectorlogo.com',
      pictures: [
        'assets/svg/aws.svg',
        'assets/svg/github.svg',
        'assets/svg/kubernetes.svg',
        'assets/svg/linkedin.svg',
        'assets/svg/xing.svg',
        'assets/svg/apache-spark.svg',
        'assets/svg/typescript.svg',
        'assets/svg/golang.svg',
        'assets/svg/hadoop.svg',
        'assets/svg/openshift.svg',
        'assets/svg/docker.svg',
        'assets/svg/angular.svg',
        'assets/svg/vscode.svg',
        'assets/svg/jwt.svg',
        'assets/svg/google-cloud.svg',
        'assets/svg/ms-azure.svg',
        'assets/svg/hamburg.svg',
        'assets/svg/ansible.svg',
      ],
    },
    {
      name: 'www.wishforge.games',
      link: 'https://freeicons.io/profile/2257',
      from: 'www.freeicons.io',
      pictures: [
        'assets/svg/collage_degree.svg',
        'assets/svg/education.svg',
        'assets/svg/build_deployment.svg',
      ],
    },
    {
      name: 'Free Preloaders',
      link: 'https://freepreloaders.com',
      from: 'www.freeicons.io',
      pictures: [
        'assets/svg/container.svg',
        'assets/svg/home.svg',
        'assets/svg/container-shipping.svg',
      ],
    },
    {
      name: 'Raj Dev',
      link: 'https://freeicons.io/profile/714',
      from: 'www.freeicons.io',
      pictures: [
        'assets/svg/link.svg',
        'assets/svg/pictures.svg',
        'assets/svg/mail.svg',
        'assets/svg/software.svg',
        'assets/svg/image.svg',
        'assets/svg/info.svg',
        'assets/svg/locked.svg',
        'assets/svg/unlocked.svg',
        'assets/svg/cloud.svg',
        'assets/svg/box.svg',
        'assets/svg/cloud2.svg',
        'assets/svg/target.svg',
      ],
    },
    {
      name: 'Muhammad Haq',
      link: 'https://freeicons.io/profile/823',
      from: 'www.freeicons.io',
      pictures: ['assets/svg/location.svg', 'assets/svg/ship.svg'],
    },
    {
      name: 'Anu Rocks',
      link: 'https://freeicons.io/profile/730',
      from: 'www.freeicons.io',
      pictures: ['assets/svg/security.svg'],
    },
    {
      name: 'icon king1',
      link: 'https://www.freeicons.io/profile/3',
      from: 'www.freeicons.io',
      pictures: [
        'assets/svg/vulnerability.svg',
        'assets/svg/python.svg',
        'assets/svg/java.svg',
        'assets/svg/windmill.svg',
        'assets/svg/small.svg',
        'assets/svg/cloud-server.svg',
        'assets/svg/shocked.svg',
      ],
    },
    {
      name: 'Shabna Ashraf',
      link: 'https://www.freeicons.io/profile/3423',
      from: 'www.freeicons.io',
      pictures: ['assets/svg/virus.svg'],
    },
    {
      name: 'Bootstrap',
      link: 'https://icons.getbootstrap.com/icons/code-slash/',
      from: 'icons.getbootstrap.com',
      pictures: ['assets/svg/code-slash.svg'],
    },
    {
      name: 'Freepik',
      link: 'https://www.flaticon.com/authors/freepik',
      from: 'www.flaticon.com',
      pictures: [
        'assets/svg/castle1.svg',
        'assets/svg/castle3.svg',
        'assets/svg/castle4.svg',
        'assets/svg/virus2.svg',
        'assets/svg/padlock.png',
      ],
    },
    {
      name: 'Pixel perfect',
      link: 'https://www.flaticon.com/authors/pixel-perfect',
      from: 'www.flaticon.com',
      pictures: ['assets/svg/castle2.svg'],
    },
    {
      name: 'IYIKON',
      link: 'https://www.freeicons.io/profile/5876',
      from: 'www.freeicons.io',
      pictures: ['assets/svg/security2.svg'],
    },
    {
      name: 'ColourCreatype',
      link: 'https://www.freeicons.io/profile/5790',
      from: 'www.freeicons.io',
      pictures: ['assets/svg/could-color.svg'],
    },
    {
      name: 'Reda',
      link: 'https://www.freeicons.io/profile/6156',
      from: 'www.freeicons.io',
      pictures: ['assets/svg/security3.svg'],
    },
    {
      name: 'MD Badsha Meah',
      link: 'https://freeicons.io/profile/3335',
      from: 'www.freeicons.io',
      pictures: ['assets/svg/flow.svg'],
    },
    {
      name: 'Lima Studio',
      link: 'https://freeicons.io/profile/6195',
      from: 'www.freeicons.io',
      pictures: ['assets/svg/reports.svg'],
    },
    {
      name: 'Google',
      link: 'https://www.flaticon.com/authors/google',
      from: 'www.flaticon.com',
      pictures: ['assets/svg/history.svg'],
    },
    {
      name: 'Eucalyp',
      link: 'https://www.flaticon.com/authors/eucalyp',
      from: 'www.flaticon.com',
      pictures: ['assets/svg/cloud3.svg'],
    },
    {
      name: 'Wichai.wi',
      link: 'https://www.flaticon.com/authors/wichaiwi',
      from: 'www.flaticon.com',
      pictures: ['assets/svg/security4.svg'],
    },
    {
      name: 'Pixel perfect',
      link: 'https://www.flaticon.com/authors/pixel-perfect',
      from: 'www.flaticon.com',
      pictures: ['assets/svg/github2.svg'],
    },
    {
      name: 'surang',
      link: 'https://www.flaticon.com/authors/surang',
      from: 'www.flaticon.com',
      pictures: ['assets/svg/kubernetes_architektur.svg'],
    },
    {
      name: 'eucalyp',
      link: 'https://www.flaticon.com/authors/eucalyp',
      from: 'www.flaticon.com',
      pictures: ['assets/svg/project.svg', 'assets/svg/components.svg'],
    },
    {
      name: 'Geotatah',
      link: 'https://freeicons.io/profile/122330',
      from: 'www.flaticon.com',
      pictures: ['assets/svg/expert.svg'],
    },
    {
      name: 'Fasil',
      link: 'https://freeicons.io/profile/722',
      from: 'www.flaticon.com',
      pictures: ['assets/svg/opensource.svg'],
    },
    {
      name: 'Hilmy Abiyyu Asad',
      link: 'https://freeicons.io/profile/75801',
      from: 'www.flaticon.com',
      pictures: [
        'assets/svg/collaboration.svg',
        'assets/svg/CV-minimal.svg',
      ],
    },
    {
      name: 'WANICON',
      link: 'https://freeicons.io/profile/88863',
      from: 'www.flaticon.com',
      pictures: ['assets/svg/robot.svg'],
    },
    {
      name: 'MD Badsha Meah',
      link: 'https://freeicons.io/profile/3335',
      from: 'www.flaticon.com',
      pictures: ['assets/svg/CV.svg'],
    },
    {
      name: 'Manthana Chaiwong',
      link: 'https://freeicons.io/profile/112433',
      from: 'www.flaticon.com',
      pictures: ['assets/svg/case_study.svg'],
    },
    {
      name: 'ToZIcon',
      link: 'https://freeicons.io/profile/126253',
      from: 'www.flaticon.com',
      pictures: ['assets/svg/delivery.svg'],
    },
  ];
}
