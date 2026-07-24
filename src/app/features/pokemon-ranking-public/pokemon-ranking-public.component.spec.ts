import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonRankingPublicComponent } from './pokemon-ranking-public.component';

describe('PokemonRankingPublicComponent', () => {
  let component: PokemonRankingPublicComponent;
  let fixture: ComponentFixture<PokemonRankingPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonRankingPublicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonRankingPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
