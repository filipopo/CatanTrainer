import CatanHex from './catan_hex'
import HexField from './hex_field'

class CatanField extends HexField {
  constructor(public board: Array<CatanHex>[]) { super(board) }

  public static makeBoard(boardSize: number) {
    const board: Array<CatanHex>[] = []

    for (let r = 0; r < 2 * boardSize - 5; r++) {
      const offset = Math.floor(boardSize / 2) - r
      board.push(Array.from({ length: boardSize - Math.abs(offset) }, (_, col) => (
        new CatanHex(col + Math.max(0, offset), r)
      )))
    }

    return board
  }
}

export default CatanField
