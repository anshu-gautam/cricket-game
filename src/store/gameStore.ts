import { create } from "zustand";

export interface Player {
  id: string;
  name: string;
  battingSkill: number;
  bowlingSkill: number;
  fieldingSkill: number;
}

export interface Team {
  id: string;
  name: string;
  players: Player[];
}

export interface GameState {
  gameMode: "SINGLE_PLAYER" | "MULTIPLAYER" | null;
  matchFormat: "T20" | "ODI" | "TEST" | null;
  selectedTeam: Team | null;
  opposingTeam: Team | null;
  score: {
    runs: number;
    wickets: number;
    overs: number;
    balls: number;
  };
  isPlaying: boolean;
  // Actions
  setGameMode: (mode: "SINGLE_PLAYER" | "MULTIPLAYER") => void;
  setMatchFormat: (format: "T20" | "ODI" | "TEST") => void;
  setSelectedTeam: (team: Team) => void;
  setOpposingTeam: (team: Team) => void;
  updateScore: (runs: number) => void;
  addWicket: () => void;
  updateOvers: () => void;
  startMatch: () => void;
  endMatch: () => void;
}

const useGameStore = create<GameState>((set) => ({
  gameMode: null,
  matchFormat: null,
  selectedTeam: null,
  opposingTeam: null,
  score: {
    runs: 0,
    wickets: 0,
    overs: 0,
    balls: 0,
  },
  isPlaying: false,

  setGameMode: (mode) => set({ gameMode: mode }),
  setMatchFormat: (format) => set({ matchFormat: format }),
  setSelectedTeam: (team) => set({ selectedTeam: team }),
  setOpposingTeam: (team) => set({ opposingTeam: team }),

  updateScore: (runs) =>
    set((state) => ({
      score: {
        ...state.score,
        runs: state.score.runs + runs,
      },
    })),

  addWicket: () =>
    set((state) => ({
      score: {
        ...state.score,
        wickets: state.score.wickets + 1,
      },
    })),

  updateOvers: () =>
    set((state) => {
      const newBalls = state.score.balls + 1;
      return {
        score: {
          ...state.score,
          balls: newBalls % 6,
          overs: state.score.overs + (newBalls % 6 === 0 ? 1 : 0),
        },
      };
    }),

  startMatch: () => set({ isPlaying: true }),
  endMatch: () => set({ isPlaying: false }),
}));

export default useGameStore;
