import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import messages from "src/shared/config/strings-constants";
import returnMessage from "src/shared/return-messages";
import { Repository } from "typeorm";
import { GeneralSettingsEntity } from "./entities/general-settings.entity";

@Injectable()
export class GeneralSettingsService {
  private generalId = 123123123;
  constructor(
    @InjectRepository(GeneralSettingsEntity)
    private readonly generalSettingsRepository: Repository<GeneralSettingsEntity>
  ) {}

  async findById(): Promise<GeneralSettingsEntity> {
    let settings: GeneralSettingsEntity;
    try {
      settings = await this.generalSettingsRepository.findOne({
        id: this.generalId,
      });
    } catch (error) {
      throw new Error(`${messages.generalSettingsError} - ${error}`);
    }
    if (!settings) {
      throw new Error(messages.generalSettingsNotFound);
    }
    return settings;
  }

  async create(
    entity: GeneralSettingsEntity,
    options?: Object
  ): Promise<GeneralSettingsEntity> {
    entity.id = this.generalId;
    const settings = await this.generalSettingsRepository.find();
    if (settings.length === 1) {
      throw new Error(messages.generalSettingsOnlyOne);
    }
    const newSettings = this.generalSettingsRepository.create(entity);
    return await this.generalSettingsRepository.save(newSettings);
  }

  async update(
    newValue: GeneralSettingsEntity
  ): Promise<GeneralSettingsEntity> {
    const setting = await this.generalSettingsRepository.findOne({
      id: this.generalId,
    });
    if (!setting) {
      throw new Error(messages.generalSettingsNotFound);
    }
    const settingUpdated:GeneralSettingsEntity = {
      id:this.generalId,
      descLugarOrigen: newValue.descLugarOrigen,
      idLugarOrigen: newValue.idLugarOrigen,
      idSeguro: newValue.idSeguro,
      letraComprobante: newValue.letraComprobante,
      bocaComprobante: newValue.bocaComprobante,
      idRetiroADomicilio: newValue.idRetiroADomicilio,
      idEntregaDomicilio: newValue.idEntregaDomicilio,
      idAgenciaOrigen: newValue.idAgenciaOrigen,
      descAgenciaOrigen: newValue.descAgenciaOrigen,
      domicilioAgenciaOrigen: newValue.domicilioAgenciaOrigen,
      telefonoAgenciaOrigen: newValue.telefonoAgenciaOrigen,
      cpAgenciaOrigen: newValue.cpAgenciaOrigen,
      otrosImportes: newValue.otrosImportes
    };
    return await this.generalSettingsRepository.save(settingUpdated);
  }

  async delete(id: number): Promise<void | GeneralSettingsEntity> {
    const setting = await this.generalSettingsRepository.findOne({ id: id });
    if (!setting) {
      returnMessage(messages.generalSettingsNotFound);
    }
    return this.generalSettingsRepository.remove(setting);
  }
}
