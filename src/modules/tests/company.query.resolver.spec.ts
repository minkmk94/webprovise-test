import {Test} from '@nestjs/testing';
import {CompanyQueryResolver} from '../company/resolvers/company.query.resolver';
import {CompanyEntity} from '../../entities/company.entity';
import {getRepositoryToken} from '@nestjs/typeorm';
import {TravelEntity} from '../../entities/travel.entity';

describe('CatsController', () => {
  let companyResolver: CompanyQueryResolver;
  const mockCompaniesRepository = {
    find: jest.fn().mockResolvedValue([{
      id: 'uuid-1',
    }]),
    findOneBy: jest.fn().mockResolvedValue({
      id: 'uuid-1',
    }),
    findBy: jest.fn().mockResolvedValue([]),
  };
  const mockTravelRepository = {
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      getRawOne: jest.fn().mockReturnValueOnce({id: 'uuid-1', price: 1000}),
    })),
  };


  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
          CompanyQueryResolver,
          {
            provide: getRepositoryToken(CompanyEntity),
            useValue: mockCompaniesRepository,
          },
          {
            provide: getRepositoryToken(TravelEntity),
            useValue: mockTravelRepository,
          }
        ],
    }).compile();

    companyResolver = moduleRef.get<CompanyQueryResolver>(CompanyQueryResolver);
  });

  describe('findAll', () => {
    it('should return an array of companies', async () => {
      const companies = await companyResolver.getCompanies();
      expect(companies.length).toBeGreaterThan(0);
    });
  });

  describe('getChildren', () => {
    it('should return an array of children companies', async () => {
      const parent = {
        id: 'uuid-1'
      } as CompanyEntity;
      const companies = await companyResolver.children(parent);
      expect(companies).toEqual({
        id: 'uuid-1',
      });
    });
  });

  describe('getCost', () => {
    it('should return cost of company', async () => {
      const parent = {
        id: 'uuid-1'
      } as CompanyEntity;
      const cost = await companyResolver.cost(parent);
      expect(cost).toEqual(1000);
    });
  });
});