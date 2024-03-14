import { useEffect, useState, useRef } from 'react';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import * as searchServices from '~/services/searchServices';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useDebounce } from '~/hooks';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!debounced.trim()) {
            // nếu giá trị của debounced sau khi cắt hết khoảng trắng đầu cuối là ''
            setSearchResults([]); // thì set danh sách kết quả là mảng rỗng để ẩn danh sách kết quả ra khỏi giao diện
            return; // bỏ qua đoạn code phía dưới để hạn chế việc call api
        }

        const fetchApi = async () => {
            // khai báo hàm gọi api
            setLoading(true); // để hiển thị icon loading
            const result = await searchServices.search(debounced); // khai 1 biến để chờ kết quả trả về từ hàm tìm kiếm,
            // sử dụng await để chờ hàm trả ra kết quả thì mới bắt đầu chạy tiếp
            if (result) {
                setSearchResults(result); // nếu giá trị tìm kiếm khác undefined, null thì trả ra kết quả tìm kiếm
            } else {
                setSearchResults([]); // ngược lại nếu giá trị tìm kiếm là undefined, null
                //thì trả ra kết quả là mảng rỗng và ko hiển thị ra giao diện
            }
            setLoading(false); // ngừng hiển thị icon loading
        };

        fetchApi(); // gọi hàm khai báo ở trên
    }, [debounced]); // khai báo giá trị phụ thuộc cho useEffect để theo dõi thay đổi của giá trị đó

    const handleHideResults = () => {
        setShowResults(false);
    };
    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            // nếu giá trị tìm kiếm bắt đầu ko phải là khoảng trắng thì gắn gía trị tìm kiếm váo State
            setSearchValue(searchValue);
        }
    };

    return (
        // Using a wrapper <div> tag around the reference element solves
        // this by creating a new parentNode context
        <div>
            <HeadlessTippy
                interactive
                appendTo={() => document.body}
                visible={showResults && searchResults.length > 0}
                render={(attrs) => (
                    <div className={cx('search-results')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Tìm kiếm gần đây</h4>
                            {searchResults.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResults}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Tìm kiếm"
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResults(true)}
                    />
                    {!!searchValue && !loading && (
                        <button
                            className={cx('clear')}
                            onClick={() => {
                                setSearchValue('');
                                setSearchResults([]);
                                inputRef.current.focus();
                            }}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
