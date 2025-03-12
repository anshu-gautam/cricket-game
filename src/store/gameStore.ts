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
  isPlaying: boolean;
  score: {
    runs: number;
    wickets: number;
    overs: number;
    balls: number;
  };
  gameMode: "SINGLE_PLAYER" | "MULTIPLAYER" | null;
  matchFormat: "T20" | "ODI" | "TEST" | null;
  selectedTeam: Team | null;
  opposingTeam: Team | null;
  actions: {
    startMatch: () => void;
    endMatch: () => void;
    updateScore: (runs: number) => void;
    addWicket: () => void;
    updateOvers: () => void;
    setGameMode: (mode: "SINGLE_PLAYER" | "MULTIPLAYER") => void;
    setMatchFormat: (format: "T20" | "ODI" | "TEST") => void;
    resetGame: () => void;
  };
}

const initialState = {
  isPlaying: false,
  score: {
    runs: 0,
    wickets: 0,
    overs: 0,
    balls: 0,
  },
  gameMode: null,
  matchFormat: null,
  selectedTeam: null,
  opposingTeam: null,
};

const useGameStore = create<GameState>((set, get) => ({
  ...initialState,
  actions: {
    startMatch: () => set({ isPlaying: true }),
    endMatch: () => set({ isPlaying: false }),
    updateScore: (runs: number) =>
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
        ...(state.score.wickets >= 9 ? { isPlaying: false } : {}),
      })),
    updateOvers: () =>
      set((state) => {
        const newBalls = state.score.balls + 1;
        const newOvers = state.score.overs + (newBalls >= 6 ? 1 : 0);

        return {
          score: {
            ...state.score,
            balls: newBalls % 6,
            overs: newOvers,
          },
          ...(newOvers >=
          (state.matchFormat === "T20"
            ? 20
            : state.matchFormat === "ODI"
            ? 50
            : state.matchFormat === "TEST"
            ? 90
            : 0)
            ? { isPlaying: false }
            : {}),
        };
      }),
    setGameMode: (mode) => set({ gameMode: mode }),
    setMatchFormat: (format) => set({ matchFormat: format }),
    resetGame: () => set(initialState),
  },
}));

export default useGameStore;
