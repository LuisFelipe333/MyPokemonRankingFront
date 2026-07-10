import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonRankingComponent } from './pokemon-ranking.component';

describe('PokemonRankingComponent', () => {
  let component: PokemonRankingComponent;
  let fixture: ComponentFixture<PokemonRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonRankingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
