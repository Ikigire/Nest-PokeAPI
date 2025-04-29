import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { find } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {

private defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService
  ) {
    this.defaultLimit = this.configService.getOrThrow<number>('defaultLimit');
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon: Pokemon = await this.pokemonModel.create(createPokemonDto);
      
      return pokemon;
    } catch (error) {
      this.handleException(error);
    }

  }

  findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    return this.pokemonModel.find().limit(limit).skip(offset).sort({ no: 1 }).select('-__v');
  }

  async findOne(searchTerm: string) {
    let pokemon: Pokemon | null = null;

    // Search by no
    if ( !isNaN(+searchTerm) ) {
      pokemon = await this.pokemonModel.findOne({ no: +searchTerm });
    }

    // Search by mongoid
    if ( !pokemon && isValidObjectId(searchTerm) ) {
      pokemon = await this.pokemonModel.findById( searchTerm );
    }

    // Search by name
    if ( !pokemon ) {
      pokemon = await this.pokemonModel.findOne({ name: searchTerm.toLowerCase() });
    }

    if ( !pokemon ) throw new NotFoundException(`Pokemon with id, no or name ${searchTerm} not found`);

    return pokemon;

  }

  async update(searchTerm: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(searchTerm);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
    await pokemon.updateOne(updatePokemonDto, { new: true });
    } catch (error) {
      this.handleException(error);
    }

    return {...pokemon.toJSON(), ...updatePokemonDto};
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);

    // pokemon.deleteOne();
    // return {id}
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) throw new NotFoundException(`Pokemon with id ${id} not found`);

    return
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon ${JSON.stringify(error.keyValue)} already exists`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't complete the request - check server logs`);
  }
}
