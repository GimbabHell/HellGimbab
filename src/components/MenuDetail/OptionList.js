import { Option } from "./Option";
import { Option2 } from "./Option2";
import { FaAngleRight } from "react-icons/fa6";

export const OptionList = ({ cate, subCategoryName, group }) => {
    if (subCategoryName === "밥" || subCategoryName === "디핑소스" || subCategoryName === "소스" || subCategoryName === "컵누들" || subCategoryName === "컵라면" || subCategoryName === "음료") {
        subCategoryName += "선택(필수, 단일선택)";
    } else if (subCategoryName === "야채") {
        subCategoryName += "선택(필수, 다중선택)";
    } else if (subCategoryName === "토핑") {
        subCategoryName += "선택(선택, 다중선택)";
    }

    return (
        <div className="optionList">
            <div>
                <h4 className="subCategoryName">{subCategoryName}</h4>
                <p className={`scrollNext ${cate.length > 4 ? "show" : ""}`}>
                    옆으로 넘겨보세요 <FaAngleRight />
                </p>
            </div>
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
