import { Option } from "./Option";

export const OptionList = ({ cate, subCategoryName, group }) => {
    return (
        <div className="optionList">
            <h4 className="subCategoryName">{subCategoryName}</h4>
            <ul>
                {cate.map((item, index) => (
                    <Option key={index} index={index} item={item} group={group} />
                ))}
            </ul>
        </div>
    );
};
