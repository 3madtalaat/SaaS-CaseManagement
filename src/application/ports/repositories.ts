/**
 * Repository ports — implemented in infrastructure/database.
 * Add methods per aggregate as you implement use cases.
 */

export interface TenantScoped {
  tenant_id: string;
}

export interface IUserRepository {
  // e.g. findById(id: string): Promise<User | null>;
}

export interface ITenantRepository {
  // ...
}

export interface ICaseRepository {
  // ...
}
