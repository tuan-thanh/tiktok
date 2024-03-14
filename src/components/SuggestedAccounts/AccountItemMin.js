import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './SuggestedAccounts.module.scss';
import AccountPreview from './AccountPreview';

const cx = classNames.bind(styles);

function AccountItemMin() {
    const renderPreview = (props) => {
        // tạo ra hàm xem trước, tabIndex là khi ấn tab trên bàn phím tự focus để giá trị -1 tránh focus vào
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview />
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div>
            <Tippy interactive delay={[1000, 0]} offset={[-20, 0]} placement="bottom" render={renderPreview}>
                <div className={cx('account-item')}>
                    <img
                        className={cx('avatar')}
                        src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4333fc1ca041b0cdc74ce535ec3b0ee4~c5_100x100.jpeg?lk3s=a5d48078&x-expires=1709974800&x-signature=0LtjqWhm09mm3Sfjc%2Fu1FTIrQQY%3D"
                        alt=""
                    />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>huyenanh</strong>
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                        </p>
                        <p className={cx('name')}>Huyền Anh</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

AccountItemMin.propTypes = {};

export default AccountItemMin;
