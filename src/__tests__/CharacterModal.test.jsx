import { render, screen } from '@testing-library/react';
import { CharacterModal } from '../components/CharacterModal';
import { vi } from 'vitest';

describe('CharacterModal', () => {
    const mockCharacter = {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        birth_year: '19BBY',
        homeworld: 'https://swapi.dev/api/planets/1/',
        films: ['url1', 'url2', 'url3'],
        species: ['https://swapi.dev/api/species/1/'],
        url: 'https://swapi.dev/api/people/1/',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        gender: 'male',
        vehicles: [],
        starships: [],
        created: '2014-12-20T21:17:56.891000Z',
        edited: '2014-12-20T21:17:56.891000Z',
    };

    it('should display character name in modal', () => {
        render(
            <CharacterModal
                character={mockCharacter}
                isOpen={true}
                onClose={vi.fn()}
            />
        );
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    it('should not render when isOpen is false', () => {
        const { container } = render(
            <CharacterModal
                character={mockCharacter}
                isOpen={false}
                onClose={vi.fn()}
            />
        );
        expect(container.firstChild).toBeNull();
    });
});