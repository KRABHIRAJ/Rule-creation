import { Table } from ".";
import {rowData} from '../app/utils/constants'

const RuleContent = () => {
  return (
    <div className="bg-gray-50 m-4 p-4 rounded-lg">
        <Table data={rowData} />
    </div>
  )
}

export default RuleContent