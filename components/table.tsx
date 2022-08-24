import { NextComponentType } from "next"
import { AppProps } from "next/app"
import { PropsWithChildren } from "react"

const Table: NextComponentType = ({ data, flip }: AppProps) => {
  const tableTitles = ["Move-out Date", "id", "address", 'room', 'last occupant', 'uuid', 'balance']
  return (
    <table className="overflow-x-scroll">
      <thead>
        <tr>
          {tableTitles.map(title => (
            <th key={title} className="font-bold md:text-l px-4 py-2">{title}</th>
          ))}
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody className="my-4 text-sm">
      {data.map(d => (
        <tr key={d.id} className="border-t text-center py-2">
          <td className="mx-4 my-4 block">{ d.moveOutDate }</td>
          <td>{ d.id }</td>
          <td className="flex justify-between items-center py">
            <img src={d.image} className="w-6 h-6 rounded-full object-fit mx-2" />
            { d.address }
            </td>
          <td>{ d.room }</td>
          <td>{ d.location }</td>
          <td>{ d.uuid }</td>
          <td>{ d.balance }</td>
          <td><button onClick={e => flip(d.id, d.balance)} className="border py px-8 block rounded-sm">flip</button></td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default Table;