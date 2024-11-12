import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractDocument } from './abstract.schema';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    return (await createDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    if (filterQuery._id && !Types.ObjectId.isValid(filterQuery._id)) {
      throw new NotFoundException('Document not found');
    }

    const document = await this.model
      .findOne(filterQuery)
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document was not found with filterQuery');
      throw new NotFoundException('Document was not found');
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    if (filterQuery._id && !Types.ObjectId.isValid(filterQuery._id)) {
      throw new NotFoundException('Document not found');
    }

    const document = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<TDocument>(true);

    if (!document) {
      this.logger.warn('Document was not found with filterQuery');
      throw new NotFoundException('Document was not found');
    }

    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(filterQuery).lean<TDocument[]>(true);
  }

  async pagination(
    filterQuery: FilterQuery<TDocument>,
    skip: number,
    limit: number,
  ): Promise<TDocument[]> {
    console.log(filterQuery);
    return this.model
      .find(filterQuery)
      .skip(skip)
      .limit(limit)
      .lean<TDocument[]>(true);
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    if (filterQuery._id && !Types.ObjectId.isValid(filterQuery._id)) {
      throw new NotFoundException('Document not found');
    }

    return this.model.findOneAndDelete(filterQuery).lean<TDocument>(true);
  }
}
