import {ProjectModel, ProjectStatusEnum} from "../models/ProjectModel";

const projects: ProjectModel[] = [
  {
    id: '1',
    name: 'Projet 1',
    status: ProjectStatusEnum.ACTIVE,
    affairs: [
      {
        id: 1,
        name: 'Affaire 1.1',
      },
      {
        id: 2,
        name: 'Affaire 1.2',
      },
      {
        id: 3,
        name: 'Affaire 1.3',
      },
    ],
  },
  {
    id: '2',
    name: 'Projet 2',
    status: ProjectStatusEnum.ARCHIVED,
    affairs: [
      {
        id: 4,
        name: 'Affaire 2.1',
      },
      {
        id: 5,
        name: 'Affaire 2.2',
      },
    ],
  },
  {
    id: '3',
    name: 'Projet 3',
    status: ProjectStatusEnum.ACTIVE,
    affairs: [
      {
        id: 6,
        name: 'Affaire 3.1',
      },
    ],
  },
  {
    id: '4',
    name: 'Projet 4',
    status: ProjectStatusEnum.DELETED,
    affairs: [
      {
        id: 7,
        name: 'Affaire 4.1',
      },
      {
        id: 8,
        name: 'Affaire 4.2',
      },
      {
        id: 9,
        name: 'Affaire 4.3',
      },
    ],
  },
  {
    id: '5',
    name: 'Projet 5',
    status: ProjectStatusEnum.ACTIVE,
    affairs: [
      {
        id: 10,
        name: 'Affaire 5.1',
      },
      {
        id: 11,
        name: 'Affaire 5.2',
      },
    ],
  },
  {
    id: '6',
    name: 'Projet 6',
    status: ProjectStatusEnum.ARCHIVED,
    affairs: [
      {
        id: 12,
        name: 'Affaire 6.1',
      },
    ],
  },
  {
    id: '7',
    name: 'Projet 7',
    status: ProjectStatusEnum.ACTIVE,
    affairs: [
      {
        id: 13,
        name: 'Affaire 7.1',
      },
      {
        id: 14,
        name: 'Affaire 7.2',
      },
    ],
  },
  {
    id: '8',
    name: 'Projet 8',
    status: ProjectStatusEnum.DELETED,
    affairs: [
      {
        id: 15,
        name: 'Affaire 8.1',
      }
    ]
  },
  {
    id: '9',
    name: 'Projet 8',
    status: ProjectStatusEnum.DELETED,
  },
  {
    id: '10',
    name: 'Projet 8',
    status: ProjectStatusEnum.DELETED,
    affairs: [
      {
        id: 15,
        name: 'Affaire 10.1',
      },
      {
        id: 15,
        name: 'Affaire 10.2',
      }
    ]
  }
]


