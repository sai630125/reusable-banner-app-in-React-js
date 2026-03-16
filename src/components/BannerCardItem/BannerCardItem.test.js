import {render, screen} from '@testing-library/react'
import BannerCardItem from './BannerCardItem'

describe('BannerCardItem component', () => {
  test('renders the banner title', () => {
    render(<BannerCardItem />)
    expect(screen.getByText('The Seasons Latest')).toBeInTheDocument()
  })
})
