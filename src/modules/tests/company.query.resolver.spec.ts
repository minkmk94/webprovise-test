import {Test} from '@nestjs/testing';
import {CompanyQueryResolver} from '../company/resolvers/company.query.resolver';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {GET_COMPANIES_URL, GET_TRAVELS_URL} from '../company/constants';

describe('CatsController', () => {
  let companyResolver: CompanyQueryResolver;

  const parent = {
    "id": "uuid-1",
    "createdAt": "2021-02-26T00:55:36.632Z",
    "name": "Webprovise Corp",
    "parentId": "0"
  };

  const child = {
    "id": "uuid-2",
    "createdAt": "2021-02-25T10:35:32.978Z",
    "name": "Stamm LLC",
    "parentId": "uuid-1"
  };
  const travelsData = [{
    "id": "uuid-t1",
    "createdAt": "2020-08-27T00:22:26.927Z",
    "employeeName": "Garry Schuppe",
    "departure": "Saint Kitts and Nevis",
    "destination": "Pitcairn Islands",
    "price": "362.00",
    "companyId": "uuid-1"
  }];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
          CompanyQueryResolver,
        ],
    }).compile();

    companyResolver = moduleRef.get<CompanyQueryResolver>(CompanyQueryResolver);
  });

  describe('findAll', () => {
    it('should return an array of companies', async () => {
      const mock = new MockAdapter(axios);
      const companiesData = [parent, child];
      mock.onGet(GET_COMPANIES_URL).reply(200, companiesData);
      mock.onGet(GET_TRAVELS_URL).reply(200, travelsData);
      const companies = await companyResolver.getCompanies();
      expect(companies.length).toBeGreaterThan(0);
    });
  });

  describe('children', () => {
    it('should return children companies', () => {
      companyResolver['companies'] = [parent, child];
      const result = companyResolver.children(parent);
      expect(result.length).toEqual(1);
    });
  });

  describe('getCost', () => {
    it('should return cost of company', async () => {
      companyResolver['travels'] = travelsData;
      const cost = companyResolver.cost(parent);
      expect(cost).toEqual(362);
    });
  });

  describe('getChild', () => {
    it('should return all children companies', () => {
      companyResolver['companies'] = [parent, child];
      const result = companyResolver['getChild'](parent.id);
      expect(result.length).toEqual(1);
    });
  });
});