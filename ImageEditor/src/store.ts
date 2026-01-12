import { create } from 'zustand';

interface CanvasEditorState {
  brushSize: number
  setBrushSize: (val: number) => void
  isDrawing: boolean
  setIsDrawing: (val: boolean) => void
  undoStack: string[]
  addUndoStack: (val: string) => void
  clearUndoStack: () => void
  redoStack: string[]
  addRedoStack: (val: string) => void
  clearRedoStack: () => void
}

export const useCanvasEditorStore = create<CanvasEditorState>()((set) => ({
  brushSize: 5,
  setBrushSize: (val) => set({ brushSize: val }),
  isDrawing: false,
  setIsDrawing: (val) => set({ isDrawing: val }),
  undoStack: [] as string[],
  addUndoStack: (val) => set((state) => ({ ...state, undoStack: [...state.undoStack, val] }), true),
  clearUndoStack: () => set(() => ({ undoStack: [] })),
  redoStack: [] as string[],
  addRedoStack: (val) => set((state) => ({ ...state, redoStack: [...state.redoStack, val] }), true),
  clearRedoStack: () => set(() => ({ redoStack: [] })),
}));