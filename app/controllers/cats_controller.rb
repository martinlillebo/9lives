class CatsController < ApplicationController
  def index
    @cats = Cat.all

    @cats = Cat.where.not(latitude: nil, longitude: nil)
    @markers = @cats.geocoded.map do |cat|
      {
        lat: cat.latitude,
        lng: cat.longitude
      }
    end
  end

  def show
    @cat = Cat.find(params[:id])
  end

  def new
    @cat = Cat.new
  end

  def create
    @new_cat = Cat.create!(strong_params)
    if @new_cat.save
      redirect_to root_path(@cat)
    else
      render :new
    end
  end

  private

  def strong_params
    params.require(:cat).permit(:name, :gender, :breed, :hypoallergenic, :mood, :photo) #returns a hash with the listed key/value pairs
  end

end
