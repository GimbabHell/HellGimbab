import { Option } from "./Option";
import { Option2 } from "./Option2";

export const OptionList = ({ cate, subCategoryName, group }) => {
    return (
        <div className="optionList">
            <h4 className="subCategoryName">{subCategoryName}</h4>
            <ul>
                {cate.map((item, index) => {
                    if (item.subCategoryCode === 1002 || item.subCategoryCode === 1005) {
                        return <Option key={index} index={index} item={item} group={group} />;
                    } else {
                        return <Option2 key={index} index={index} item={item} group={group} />;
                    }
                })}
            </ul>
        </div>
    );
};
