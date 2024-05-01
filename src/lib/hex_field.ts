import Hex, {Cords} from './hex'

class HexField {
  constructor(public board: Array<Hex>[]) {}

  public static makeBoard(N: number) {
    const board: Array<Hex>[] = []

    for (let r = 0; r < 2*N + 1; r++) {
      board.push(Array.from({ length: 2*N + 1 - Math.abs(N - r) }, (_, col) => (
        new Hex(col + Math.max(0, N - r), r)
      )))
    }

    return board
  }

  public cordsToIndex(cords: Cords) {
    if (cords.reduce((a, c) => a + c) !== 0) throw 'q + r + s must be 0'

    const half = Math.floor(this.board.length / 2)
    const col = cords[1] < half ? cords[0] - half + cords[1] : cords[0]

    return [cords[1], col]
  }

  public getHex(q: number, r: number, s = -q - r) {
    const col = this.cordsToIndex([q, r, s])[1]
    if (this.board[r] && this.board[r][col])
      return this.board[r][col]

    return false
  }

  // Also serves as a map to direct inwardSpiral i.e corners().indexof('0 0') === 4
  public corners() {
    const mid = Math.floor(this.board.length / 2)
    const end = this.board.length - 1

    return [
      `${end} 0`,
      `${end} ${this.board[0].length}`,
      `${mid} ${this.board[mid].length - 1}`,
      `0 ${this.board[0].length}`,
      '0 0',
      `${mid} 0`,
    ]
  }

  public inwardSpiral(hex: Hex, direction = 4) {
    let path = [hex]
    const rings = (this.board.length - 1) / 2 + 1 // N + 1

    for (let c = 0; c < rings; c++)
      for (let i = 0; i < 6; i++) {
        let next_hex: Hex | false = hex

        while (
          (next_hex = this.getHex(...next_hex.neighbor(direction))) &&
          path.every(hex => hex.cords.some((e, i) => e !== (next_hex as Hex).cords[i]))
        ) {
          hex = next_hex
          path.push(hex)
        }

        direction++
      }

    return path
  }
}

export default HexField